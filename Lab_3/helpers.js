//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.
const authorsWithMultipleGenres = [
    "John Doe",
    "Anna Van Haeften",
    "Sara Van der Merve",
    "Jane Smith",
    "Patrick O'Toole",
    "Omar Oden",
    "Leo Orback"
];

authorsWithMultipleGenres.sort((a, b) => {
    const lastNameA = a.split(' ').slice(1).join(' ').replace(/'/g, ''); // Get the full last name after the first name
    const lastNameB = b.split(' ').slice(1).join(' ').replace(/'/g, ''); // Get the full last name after the first name

    return lastNameA.localeCompare(lastNameB); // Use localeCompare for proper sorting
});

console.log(authorsWithMultipleGenres);