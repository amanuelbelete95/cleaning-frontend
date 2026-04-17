

type SkeletonProps = {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    style?: React.CSSProperties;
};

export default function Skeleton({
    width,
    height,
    borderRadius = "4px",
    style = {},
}: SkeletonProps) {
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