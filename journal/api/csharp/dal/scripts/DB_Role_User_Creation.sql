USE [songs]
GO

CREATE ROLE [trusted_app_role]
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE
	ON SCHEMA::[dbo] TO [trusted_app_role]
GO

CREATE LOGIN [songs-service] WITH PASSWORD = '' -- Add Password for the user
CREATE USER [songs-service] FOR LOGIN [songs-service] WITH DEFAULT_SCHEMA=[dbo] 
GO

ALTER ROLE [trusted_app_role] ADD MEMBER [songs-service]
GO