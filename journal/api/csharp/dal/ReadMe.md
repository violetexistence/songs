# ReadMe for the DAL

## Installation

 * Install SQl Server Expresss LocalDB, or full SQL SSRS
 * [SQLExpress HowTo](https://learn.microsoft.com/en-us/sql/database-engine/configure-windows/sql-server-express-localdb?view=sql-server-ver16)
 * [2022 SLQ Express Install](https://www.sqlshack.com/install-microsoft-sql-server-express-localdb/)
 * Run DB_Role_User_Creation.sql from the scripts project folder (adding your own unique password)
 * Visual Studio 2022

 * Set environment variable for the connection string in a command prompt opened with admin rights
	* `setx SONGS_CONNECTION_STRING "Data Source=jnjnboo-gamer;Initial Catalog=songs;Persist Security Info=True;User ID=songs-service;Password=______%YOURPASSWORD%______;Encrypt=True;Trust Server Certificate=True;Command Timeout=300" /M`
 * Update all database model files in the project when there is a change to the database schema:
	* From Command Prompt 
	* `dotnet ef dbcontext scaffold "Data Source=jnjnboo-gamer;Initial Catalog=songs;Persist Security Info=True;User ID=songs-service;Password=______%YOURPASSWORD%______;Encrypt=True;Trust Server Certificate=True;Command Timeout=300" Microsoft.EntityFrameworkCore.SqlServer -o Models -f`
	* Delete this method in the Models.SongsContext.cs file: `protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)` as it contains teh service password after running the scaffold command.
 * *IMPORTANT* The files in the Models folder will be overwritten by the above command. To modify the scaffolded reverse engineered code you must use a T4 template. 
	* See the [T4 Template](https://learn.microsoft.com/en-us/ef/core/managing-schemas/scaffolding/templates?tabs=dotnet-core-cli) documentation for more information.
	* The classes are all partial classes so they can be extended.
	* 
