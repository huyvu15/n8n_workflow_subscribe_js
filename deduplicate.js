return items.reduce((acc, item) => {
    const email = item.json.Email;
    if (!acc.some(i => i.json.Email === email)) {
        acc.push(item);
    }
    return acc;
}, []);
