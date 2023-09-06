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
9. Go back to your Microsoft Visual Studio and open your Solution Explorer up again. Right click on the project name at the top of the list of files, it will be the one named ``LegendLore``. Once the options pop up you are going to Add -> New Item, and name it ``wwwroot``. You should see it pop up in the Solution Explorer with a globe icon beside it. Once your wwwroot folder is created, right click it and Add a new folder called ``MapImageUploads``. This is where all of your map images will be stored when creating a campaign or adding a new map. 
10. After all of those are installed, and your MapImageUploads folder is created, run the database files in Visual Studio. Then from your GitBash terminal while still in the ``legendlore`` folder, ``npm start`` to launch the app.


## Tools
This app was built using C#, T-SQL Server using ADO.NET, JavaScript, CSS, HTML, and React.js framework.

## Walkthrough
1. From the login page, register a new user.
![Login Page](https://user-images.githubusercontent.com/125293336/266018049-4e9c8988-cbff-48a7-9ab2-5e79ba306565.png)

2. Fill out the form and click register.
![Register Page](https://user-images.githubusercontent.com/125293336/266018060-a133d646-cc32-436a-9312-0f83ccec22a1.png)

3. You will be brought to the landing page where you can read about the app. Click the My Campaigns button in the top left of the page.
![Landing Page](https://user-images.githubusercontent.com/125293336/266018076-2db47682-057b-40c9-99c2-9527fa652447.png)

4. From the campaigns page you can view, create, edit, or delete any of your campaigns you have or will create.
![Campaigns Page](https://user-images.githubusercontent.com/125293336/266018099-a194d5e9-2493-4422-828f-3ac0c37ad44b.png)

5. Click the button in the Add A Campaign card, and fill out the form.
![Add Campaign](https://user-images.githubusercontent.com/125293336/266018126-74aa52ea-dacc-44fc-ad29-388b9c704f0c.png)

6. You can add multiple maps to campaigns with the Add Map link on the campaigns you have made.
![Add Map](https://user-images.githubusercontent.com/125293336/266018152-ad240228-0e01-4c80-9cd4-9fd9ba04fc62.png)

7. Click on the name of your campaign and select a map you would like to view.
![Map Select](https://user-images.githubusercontent.com/125293336/266018180-2bd03d18-7cc4-47dd-af3a-abc9ff6dcc5a.png)

8. You will be brought to your map page, this is where you will be able to place markers and add Points of Interest.
![Map Page](https://user-images.githubusercontent.com/125293336/266018191-c3bc0a00-fc0e-4cb6-b714-48b8eabc3e65.png)

9. Click on the map at a place you would like to add a POI and then fill out the form that pops up.
![POI Form](https://user-images.githubusercontent.com/125293336/266018253-ae0c3d40-6053-4d50-960c-b1f854b3a94e.png)

10. Once your POI is created, you can click on the marker and see your new POI. Click on this to go to the POI's page.
![POI Pop Up](https://user-images.githubusercontent.com/125293336/266018277-1620f69c-b021-4248-9d46-a2596443265b.png)

11. From here you may fill out each area of your POI, giving it notable locations your party might find in the area, NPCs they may want to talk to, or even quest hooks that might happen while they are there, or ones they may need to be made aware of.
![POI Details](https://user-images.githubusercontent.com/125293336/266023189-2eb82dd1-edfb-4179-a417-ab9787e6dc4b.png)
![POI Details 2](https://user-images.githubusercontent.com/125293336/266023211-5dd92ba6-6e96-4136-820f-0c111476541e.png)

Feel free to reach out to me if you have any questions or thoughts on my app. :)
