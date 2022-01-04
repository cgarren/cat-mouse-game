import React, { useEffect, useRef, useState, useCallback } from "react";
import cat from "./cat.png";
import mouse from "./mouse.png";


function CatAndMouse(props) {
	function handleEdges(position, left, size) {
		let windowSize = left ? props.dimensions.width : props.dimensions.height;
		if (position >= windowSize - size) {
			return windowSize - size;
		} else if (position <= 0) {
			return 0;
		}
		return -1;
	}
	return (
		<div>
			<Cat catLeftStart={props.catStart.left} catTopStart={props.catStart.top} handleEdges={handleEdges}/>
			<Mouse mouseLeftStart={props.mouseStart.left} mouseTopStart={props.mouseStart.top} Speed={props.mouseSpeed} handleEdges={handleEdges}/>
		</div>
	);
}

function Cat(props) {
	const [leftPosition, setLeftPosition] = useState(props.catLeftStart);
	const [topPosition, setTopPosition] = useState(props.catTopStart);
	const catRef = useRef(null);

	function handleCatMove(e) {
		let xMove = e.x - catRef.current.clientWidth / 2;
		let yMove = e.y - catRef.current.clientHeight / 2;
		setLeftPosition(xMove);
		setTopPosition(yMove);
		window.dispatchEvent(new CustomEvent('catMoveEvent', { detail: { "x": xMove, "y": yMove, "width": catRef.current.clientWidth, "height": catRef.current.clientHeight } }));
	}

	useEffect(() => {
		window.addEventListener("pointermove", handleCatMove);
		return () => window.removeEventListener("pointermove", handleCatMove);
	}, [leftPosition, topPosition])

	let imageSrc = cat;
	let imageWidth = "100px";
	let theStyle = {
		left: leftPosition,
		top: topPosition,
	};
	return <img ref={catRef} style={theStyle} id="cat" width={ imageWidth } alt="cat" src={imageSrc}></img>
}

function Mouse(props) {
	const [leftPosition, setLeftPosition] = useState(props.mouseLeftStart);
	const [topPosition, setTopPosition] = useState(props.mouseTopStart);
	const mouseRef = useRef(null);
	const handleEdges = props.handleEdges;

	function getDirection(catPosition, mousePosition) {
		if (catPosition - mousePosition > 0) {
			return -1;
		} else {
			return 1;
		}
	}

	const handleMouseMove = useCallback((e) => {
		let leftMove = handleEdges(leftPosition, true, mouseRef.current.clientWidth);
		if (leftMove < 0) {
			leftMove = 6 * getDirection(e.detail.x, leftPosition) + leftPosition;
		} 
		setLeftPosition(leftMove)
		let topMove = handleEdges(topPosition, false, mouseRef.current.clientHeight);
		if (topMove < 0) {
			topMove = 6 * getDirection(e.detail.y, topPosition) + topPosition;
		} 
		setTopPosition(topMove)
	}, [leftPosition, topPosition, handleEdges, mouseRef]);

	useEffect(() => {
		window.addEventListener('catMoveEvent', handleMouseMove);
		return () => window.removeEventListener('catMoveEvent', handleMouseMove);
	}, [leftPosition, topPosition, handleMouseMove])

	let imageSrc = mouse;
	let imageWidth = "50px";
	let theStyle = {
		left: leftPosition,
		top: topPosition,
	};
	return <img ref={mouseRef} style={theStyle} id="mouse" width={ imageWidth } alt="mouse" src={imageSrc}></img>
}

export default CatAndMouse;