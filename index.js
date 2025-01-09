// Function to generate a random password with a given length
function generatePassword(length = 12) {
    // Character set used to generate the password (letters, numbers, special characters)
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    
    // Loop to randomly select characters from the charset for the password
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length); // Get a random index from charset
        password += charset[randomIndex]; // Add the character at the random index to the password
    }
    
    return password; // Return the generated password
}

// Function to estimate how long it would take to crack the password using brute force
function estimateCrackTime(passwordLength) {
    const charsetSize = 94; // Total number of possible characters in the charset (lowercase, uppercase, digits, and special characters)
    const attemptsPerSecond = 1e9; // Assume the cracking tool can make 1 billion attempts per second

    // Calculate total possible combinations for the given password length
    const combinations = Math.pow(charsetSize, passwordLength);

    // Estimate the time in seconds it would take to crack the password (combinations / attempts per second)
    const timeInSeconds = combinations / attemptsPerSecond;

    // Convert time from seconds to years
    const years = timeInSeconds / (60 * 60 * 24 * 365);
    
    return years; // Return estimated time in years
}

// Get references to the HTML elements (password input, buttons, and display area)
const passwordField = document.getElementById("password");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const crackTimeDisplay = document.getElementById("crackTime");

// Event listener for the "Generate" button
generateButton.addEventListener("click", () => {
    const password = generatePassword(); // Generate a new password
    passwordField.value = password; // Display the generated password in the input field
    
    // Estimate the crack time based on the password length and display the result
    const passwordLength = password.length;
    const estimatedTime = estimateCrackTime(passwordLength);
    crackTimeDisplay.textContent = `BruteForce Estimated Time: ${estimatedTime.toFixed(2)} Years`; // Show estimated time
});

// Event listener for the "Copy" button
copyButton.addEventListener("click", () => {
    passwordField.select(); // Select the password in the input field
    document.execCommand("copy"); // Copy the selected password to the clipboard
    alert("Password copied to clipboard!"); // Notify the user that the password has been copied
});
