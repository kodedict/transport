const formatDurationType = (durationType: string) => {
    let formatted;
    switch(durationType) {
        case "days":
            formatted = "day"
            break;
        case "weeks":
            formatted = "week"
            break;
        case "months":
            formatted = "month"
            break;
        case "years":
            formatted = "year"
            break;
    }

    return formatted;
}

export default formatDurationType