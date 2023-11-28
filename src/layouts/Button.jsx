/* eslint-disable react/prop-types */
const Button = ({
	onClick,
	children,
	loading,
	loadingIndicator,
	variant,
	size,
	disabled,
	noShadow,
}) => {
	return (
		<button
			onClick={onClick}
			className= {`btn 
								${loading} 
								${variant}
								${size}
								${disabled && 'disabled'}
								${noShadow && 'no-shadow'}
			rounded p-2 w-full bg-slate-900 `}
			disabled={disabled}
		>
			{loading ? <>{loadingIndicator}</> : <>{children}</>}
		</button>
	)
}

export default Button