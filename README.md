# blazor-sass-webpack-npm

A *Blazor Server* skeleton project that integrates *SASS* / *SCSS* and *TypeScript* for compiling assets and
*Webpack* for bundling and optimization. It also adds *Bootstrap* theming support and *Font Awesome* icons.

## Implementation

This project is just generated with ```dotnet new blazorserver -au Individual -f net5.0``` and then adding the required *NPM* packages and configuration files. You can implement it on your own projects by applying the same changes to your project.

The steps for implementing it on another project are:

1. Copy the file ```package.json```, and edit it for your project (i.e. project name).
2. Copy the file ```webpack.config.js```. Edit it if you need to change the ports for the *Blazor Server* application (default are ```http://localhost:5000``` and ```https://localhost:5001```).
3. Create the ```ClientAssets``` folder structure (just copy from this project).
4. Delete unneeded static assets from ```wwwroot``` (mainly *CSS* and *JavaScript* which now will be generated from sources on ```ClientAssets```).
5. Copy the file ```webpack.reload``` to ```wwwroot```.
6. Edit ```Program.cs``` to touch the file ```webpack.reload``` on startup (see code on this project's ```Program.cs```).
7. Disable HTTPS redirection on project ```Startup.cs```
8. Edit the file ```Pages/_Host.cshtml``` to load the *Webpack* compiled assets (see code on this project's ```Pages/_Host.cshtml```).
9. Change references to *Open Iconic* icons to *Font Awesome*. You can see examples on this project's ```Shared/NavMenu.razor```.
10. Do ```npm install```.
11. Do ```npm run quickstart``` and start to code.

## Features

- *Webpack* for building, bundling and optimization of assets.
- The ```ClientAssets``` folder contains the folder structure for SCSS and TypeScript source files
which will be compiled and bundled with *Webpack*.
- Generates sourcemaps for easy debugging.
- Support development build and optimized release build.
- *Webpack* development server for on-the-fly compilation and live-reload with HMR support for CSS.
- Included *Bootstrap* and *Font Awesome* icons support.

### *SCSS* and *TypeScript* compilation

The *SCSS* and *TypeScript* compilation is handled by *Webpack*. So you must disable *TypeScript* compilation on other tools (i.e. *Visual Studio*). This can be done by editing the ```.csproj``` file:

```xml
  <PropertyGroup>
    ...
    <!--TypeScript is compiled using Webpack-->
    <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
    ...
  </PropertyGroup>
```
To compile *SCSS* it uses [*Dart Sass*](https://sass-lang.com/dart-sass).

### Bundles

*Webpack* is configured to create CSS and JavaScript bundles. They are saved in ```wwwroot/generated``` folder. It also creates the folders ```wwwroot/generated/images``` and ```wwwroot/generated/fonts``` for the referenced assets.
When in development mode, it also generates the corresponding source maps.

### *Webpack* dev server

*Webpack* development server is used for on-the-fly compilation of *SCSS* and *TypeScript* files. For the CSS files it support *Hot Module Replacement* which let's you see the CSS changes without reloading the browser. It also supports browser live-reload for *TypeScript* or other assets changes.

When combined with ```dotnet watch run``` you get a full live-reload experience on *SCSS*, *TypeScript*, *C#* and all other static files on the project.

In order to use the *Webpack* dev server, you must disable HTTPS redirection on your project. You can enable it for production builds if you really need it. It's disabled on ```Startup.Configure()``` from ```Startup.cs```.

To force a browser reload when the *.NET* project is restarted you must touch a file from ```wwwroot``` to signal *Webpack* that it must reload the browser. You could do it by adding the following lines to the ```Main()``` method on ```Program.cs```:

```csharp
#if DEBUG
            // To force 'webpack-dev-server' to reload the browser.
            // This file must exist when 'webpack-dev-server' is started.
            // If it doesn't exists on dev server startup, it's ignored.
            File.SetLastWriteTimeUtc("wwwroot/webpack.reload", DateTime.UtcNow);
#endif
```

The *Webpack* dev server runs on ```http://localhost:8081```, and is configured to target a Blazor app running at ```http://localhost:5000```. This settings can be easily changed on ```webpack.config.js```.

### *Bootstrap* and *Font Awesome*

This project also includes *Bootstrap* and *Font Awesome*.

I just prefer *Font Awesome* icons over the default Blazor template's *Open Iconic*.

*Bootstrap* is included as a *NPM* package and is referenced via *SCSS* so you can start [theming it straight](https://getbootstrap.com/docs/4.0/getting-started/theming/).


### *NPM*

There are some *NPM* tasks preconfigured. They are:

- ```webpack:build```: builds the bundles using the *development* configuration.
- ```webpack:release```: builds the optimized bundles using the *production* configuration.
- ```webpack:watch```: watch-builds the bundles using the *development* configuration.
- ```webpack:clean```: cleans *Webpack* output.
- ```webpack:serve```: starts the *Webpack* dev server using the *development* configuration.
- ```dotnet:watch```: starts ```dotnet watch run```.
- ```quickstart```: starts ```webpack:serve``` and ```dotnet watch run``` in parallel. Prefered task for most of the development cycle. Provides live-reload of *C#*, *TypeScript*, *SCSS* and other ```wwwroot``` assets. The first browser load might fail because *Webpack* dev server is usually faster on startup up than ```dotnet watch run```. A simple browser reload solves the problem.



