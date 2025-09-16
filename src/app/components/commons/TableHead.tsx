const TableHead = ({ text }: { text: string }) => {
    return (
        <th className="px-3 py-4 text-left text-sm uppercase tracking-wider font-extrabold text-nowrap">
            {text}
        </th>
    )
}

export default TableHead