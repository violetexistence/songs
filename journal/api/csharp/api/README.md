Must be run in Visual Studio => 2022 has a community version.

# VSCode
Currently there is a [bug with dotnet 8 and VSCode](https://github.com/dotnet/vscode-csharp/issues/6167) that prevents the project from running there.
Docker Desktop is also required to run this project, debug menu should be set to Container (Docerkfile).
Also ran into an issue that I had dotnet twice on my path, had to delete one for the C# extension to work properly.