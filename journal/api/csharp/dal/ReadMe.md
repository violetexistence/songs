# ReadMe for the DAL

## Installation

 * Install SQl Server Expresss LocalDB, or full SQL SSRS
 * [SQLExpress HowTo](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16)
 * [2022 SLQ Express Install](https://www.sqlshack.com/install-microsoft-sql-server-express-localdb/)
 * Run DB_Role_User_Creation.sql from the scripts project folder (adding your own unique password)
 * Visual Studio 2022
 * Extension: EF Core Power Tools [reason](https://stackoverflow.com/a/74246101/818004)          
 * Set environment variable for the connection string in a command prompt opened with admin rights
	* `setx SONGS_CONNECTION_STRING "Data Source=jnjnboo-gamer;Initial Catalog=songs;Persist Security Info=True;User ID=songs-service;Password=______%YOURPASSWORD%______;Encrypt=True;Trust Server Certificate=True;Command Timeout=300" /M`