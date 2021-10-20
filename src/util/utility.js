export const renderThreeRows = (returnArr, first, last, username, date) => {
    returnArr.push(
        <tr>
            <td>{first} {last}</td>
            <td>{username}</td>
            <td>{date}</td>
        </tr>
    )
}

export const filterData = (data, filter) => {
    if (!!filter) {
        const newFilter = data.filter(d => d.name.first.toLowerCase().includes(filter.toLowerCase()) || d.name.last.toLowerCase().includes(filter.toLowerCase()));
        return newFilter;
    }
    return data;
}
