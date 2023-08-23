# Legend Lore

## Overview
Legend Lore is an interactive D&D 5e world building and campaign management app for DMs made to help keep your story ideas and thoughts organized and easily accessible. You may create your campaign along with a map you are using that you have either made yourself, or found and downloaded off the internet. After which you can place Points of Interest (POIs) onto the map where you can store information such as notable locations, NPCs, or quest hooks in the POI you have created. This will help keep your thoughts organized and give you an easier time to prep for sessions letting you access the specific information or areas that your party will be encountering on their journey.

## Installation
1. Fork or clone down this repository to a local branch on your computer
2. Using your GitBash terminal ``cd`` into the folder where LegendLore.sln exists and ``start LegendLore.sln``
3. Once Microsoft Visual Studio is open the Solution Explorer from the View option at the top of the window.
4. In the Solution Explorer, right click the project file named Legend Lore and click Manage NuGet Packages.
5. Here you are going to need to install a few different packages. They are as follows: ``System.Drawing.Common``, ``Swashbuckle.AspNetCore``, ``SixLabors.ImageSharp``, ``Microsoft.SqlServer.Types``, ``Microsoft.Data.SqlClient``, and ``Microsoft.AspNetCore.Cors``. 
6. Once you have those installed open both the [01_LegendLore_Create_DB.sql](https://github.com/Nic338/LegendLore/blob/main/01_LegendLore_Create_DB.sql) file and [02_LegendLore_Seed_Data.sql](https://github.com/Nic338/LegendLore/blob/main/02_LegendLore_Seed_Data.sql) file and run both of them in order to create your database.
7. After you have all of your NuGet packages installed, and your database connected correctly. We need to go back to the GitBash terminal and install the front end packages. ``cd`` down into your folder until youre in the ``client/legendlore`` file. You'll know you're in the right spot when you can run the command ``ls`` and see your package.json file.
8. Run the following commands in your terminal: ``npm install react`` ``npm install react-router-dom`` ``npm install --save reactstrap bootstrap`` ``npm i --save @fortawesome/free-solid-svg-icons``
``npm i --save @fortawesome/free-regular-svg-icons`` ``npm install react-leaflet``

9. After all of those are installed. Go back to your Microsoft Visual Studio and run the database. Then from your GitBash terminal while still in the ``legendlore`` folder, ``npm start`` to launch the app.


## Tools
This app was built using C#, T-SQL Server using ADO.NET, JavaScript, CSS, HTML, and React.js framework.

## Video Walkthrough

This is where the video walkthrough for the app will go once I am finished recording and uploading it
