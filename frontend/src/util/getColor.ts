export function getColor(index: number) {
    const backgroundColor = [
        "rgba(54, 162, 235, 0.3)",
        "rgba(75, 192, 192, 0.3)",
        "rgba(255, 159, 64, 0.3)",
        "rgba(153, 102, 255, 0.3)",
        "rgba(255, 99, 132, 0.3)"
    ];
    const borderColor = [
        "rgba(54, 162, 235)",
        "rgba(75, 192, 192)",
        "rgba(255, 159, 64)",
        "rgba(153, 102, 255)",
        "rgba(255, 99, 132)"
    ];
    return [backgroundColor[index], borderColor[index]]
}