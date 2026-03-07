# SAMVEEKSHANA Registration Portal Setup Guide

## How to Deploy to Hostinger

1. **Upload Files:** Upload all the files inside the `registration form` folder to your Hostinger `public_html` directory via File Manager.
2. **Setup Database in Hostinger:**
   - Go to your Hostinger cPanel -> Databases -> MySQL Databases.
   - Create a new database and a database user. Note down the Database Name, Username, and Password.
3. **Update Config:**
   - Open `config.php` in the File Manager.
   - Update the `$username`, `$password`, and `$dbname` variables with the credentials you just created.
4. **Run Installation:**
   - Open your browser and navigate to `https://yourdomain.com/setup.php`.
   - You should see a success message. This will automatically create the required tables in your database.
   - **Crucial:** Delete `setup.php` from the server after running it for security.
5. **Start Using:**
   - Navigate to `https://yourdomain.com/index.html` to see the registration page.
   - Navigate to `https://yourdomain.com/admin.html` to access the admin dashboard.

## Features Built
- **Glassmorphism Premium Design:** High-end transparent, blur UI using standard HTML & CSS.
- **Async Handling:** Forms and admin data tables are fetched seamlessly without page reloads.
- **Secure File Upload:** Unique names generated before saving payment screenshots.
- **Admin Event Sections:** Sidebar filters automatically update the data table according to the event.
- **Receipt Viewing Integration:** Built-in modal logic to enlarge the payment receipt.
