const renderThreeRows = (returnArr, first, last, username, date) => {
    returnArr.push(
        <tr>
            <td>{first} {last}</td>
            <td>{username}</td>
            <td>{date}</td>
        </tr>
    )
}

export default renderThreeRows;