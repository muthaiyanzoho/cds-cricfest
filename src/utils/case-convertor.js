function toReadableName(name) {
    let parts = name.split('.');
    let firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    let lastName = parts[1]?.toUpperCase();
    return `${firstName} ${lastName}`;
}

export { toReadableName }