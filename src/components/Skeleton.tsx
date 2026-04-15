

export default function Skeleton({
    width,
    height,
    borderRadius = "4px",
    style = {},
}) {
    return (
        <div
            className="skeleton"
            style={{
                width,
                height,
                borderRadius,
                ...style,
            }}
        />
    );
}