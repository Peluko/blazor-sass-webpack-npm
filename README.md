# blazor-sass-webpack-npm

A Blazor skeleton project that integrates *SASS* and *TypeScript* for compiling assets and
*Webpack* for bundling and optimization. It also adds *Bootstrap* theming support and *Font Awesome* icons.

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

*Webpack* is configured to create CSS and JavaScript bundles. They are saved in ```wwwroot/generated``` folder. It also creates the folders ```wwwroot/images``` and ```wwwroot/fonts``` for the referenced assets.
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
- ```quickstarts```: starts ```webpack:serve``` and ```dotnet watch run``` in parallel. Prefered task for most of the development cycle. Provides live-reload of *C#*, *TypeScript*, *SCSS* and other ```wwwroot``` assets. The first browser load might fail because *Webpack* dev server is usually faster on startup up than ```dotnet watch run```. A simple browser reload solves the problem.

## Implementation

This project is just generated with ```dotnet new``` and then adding the required *NPM* packages and configuration files. The initial commit of this repository is just what ```dotnet new blazorserver -au Individual -f net5.0``` generates. The following commits are the additions required to make *Webpack* work.

