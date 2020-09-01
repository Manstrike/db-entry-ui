export const authentificate = user => localStorage.setItem('user', user);

export const isAuthentificated = (user) => {
    const userStored = localStorage.getItem('user');
    if (!userStored || !user) return false;
    console.log(user === JSON.parse(userStored))
    return user.name === JSON.parse(userStored).name;
};

export const hasRole = (user, role) => user.role === role;
