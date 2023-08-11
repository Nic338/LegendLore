USE [LegendLore];
GO

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([Id], [Name]) VALUES (1, 'Admin'), (2, 'User');
SET IDENTITY_INSERT [UserType] OFF

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] ([Id], [UserName], [FirstName], [LastName], [Email], [UserTypeId]) VALUES (1, 'TestAdmin', 'Test', 'Admin', 'test@admin.com', 1);
INSERT INTO [UserProfile] ([Id], [UserName], [FirstName], [LastName], [Email], [UserTypeId]) VALUES (2, 'TestUser', 'Test', 'User', 'test@user.com', 2);
INSERT INTO [UserProfile] ([Id], [UserName], [FirstName], [LastName], [Email], [UserTypeId]) VALUES (3, 'SecondUser', 'SecondTest', 'User', 'secondtest@user.com', 2);
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Campaigns] ON
INSERT INTO [Campaigns] ([Id], [Description], [UserProfileId], [Title], [CreateDateTime]) VALUES (1, 'As the war has ended, some seek to take advantage of the silence', 1, 'Test Title', '2023-07-28');
INSERT INTO [Campaigns] ([Id], [Description], [UserProfileId], [Title], [CreateDateTime]) VALUES (2, 'The drums of war sound, as a looming threat crests the horizon', 2, 'Test Title 2', '2023-07-28');
INSERT INTO [Campaigns] ([Id], [Description], [UserProfileId], [Title], [CreateDateTime]) VALUES (3, 'Something stirs deep within the deserts of Marquet', 3, 'Test Title 3', '2023-07-28');
SET IDENTITY_INSERT [Campaigns] OFF

SET IDENTITY_INSERT [POI] ON
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (1, 'Bladegarden', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (2, 'Crookback Bog', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (3, 'Rexxentrum', 'This is a test description for a POI')
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (4, 'Bladegarden', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (5, 'Crookback Bog', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (6, 'Rexxentrum', 'This is a test description for a POI')
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (7, 'Bladegarden', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (8, 'Crookback Bog', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (9, 'Rexxentrum', 'This is a test description for a POI')
SET IDENTITY_INSERT [POI] OFF

SET IDENTITY_INSERT [Map] ON
INSERT INTO [Map] ([Id], [Name], [MapImage], [CampaignId], [Height], [Width]) VALUES (1, 'Test Map 1','https://i.pinimg.com/564x/3c/e2/70/3ce270f365c53b6274a3f3c5eef30be9.jpg', 1, 894, 894)
INSERT INTO [Map] ([Id], [Name], [MapImage], [CampaignId], [Height], [Width]) VALUES (2, 'Test Map 2', 'https://i.pinimg.com/564x/3c/e2/70/3ce270f365c53b6274a3f3c5eef30be9.jpg', 2, 894, 894)
INSERT INTO [Map] ([Id], [Name], [MapImage], [CampaignId], [Height], [Width]) VALUES (3, 'Test Map 3', 'https://i.pinimg.com/564x/3c/e2/70/3ce270f365c53b6274a3f3c5eef30be9.jpg', 3, 894, 894)
SET IDENTITY_INSERT [Map] OFF

SET IDENTITY_INSERT [MapPOIs] ON
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (1,geography::POINT(-85, 60), 1, 1);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (2,geography::POINT(-125, 70), 1, 2);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (3,geography::POINT(35, -55), 1, 3);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (4,geography::POINT(-115, 40), 2, 4);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (5,geography::POINT(-80, 70), 2, 5);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (6,geography::POINT(-98, 98), 2, 6);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (7,geography::POINT(123, 47), 3, 7);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (8,geography::POINT(-85, 60), 3, 8);
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (9,geography::POINT(-65, 50), 3, 9);
SET IDENTITY_INSERT [MapPOIs] OFF

SET IDENTITY_INSERT [NPC] ON
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (1, 'Lieutenant Bryce Harper', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (2, 'Marril the Crone', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (3, 'Martinet Ludanis Daleth', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (4, 'Blacksmith Farrith', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (5, 'Chitters', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (6, 'Professor Karil Mortania', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (7, 'Priestess Saren', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (8, 'Klog', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (9, 'King Bertrand Dwendal', 'This NPC is used as test data for you to test this app')
SET IDENTITY_INSERT [NPC] OFF

SET IDENTITY_INSERT [POINPCs] ON
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (2, 2, 2)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (3, 3, 3)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (4, 4, 4)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (5, 5, 5)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (6, 6, 6)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (7, 7, 7)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (8, 8, 8)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (9, 9, 9)
SET IDENTITY_INSERT [POINPCs] OFF

SET IDENTITY_INSERT [Quest] ON
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (1, 'A Traitor Amongst the Guard', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (2, 'A Fun-gus Time', 'This quest was made up to give seed data for this app', 'The reward for this quest was the friends we made along the way')
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (3, 'Reading Come to Life', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (4, 'Drinking Contest', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (5, 'A Ghostly Memory', 'This quest was made up to give seed data for this app', 'The reward for this quest was the friends we made along the way')
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (6, 'Familiar Woes', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (7, 'Assault from the East', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (8, 'The Crones Delimma', 'This quest was made up to give seed data for this app', 'The reward for this quest was the friends we made along the way')
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (9, 'The Rogue Volstrucker', 'This quest was made up to give seed data for this app', NULL)
SET IDENTITY_INSERT [Quest] OFF

SET IDENTITY_INSERT [POIQuests] ON
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (2, 2, 2)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (3, 3, 3)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (4, 4, 4)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (5, 5, 5)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (6, 6, 6)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (7, 7, 7)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (8, 8, 8)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (9, 9, 9)
SET IDENTITY_INSERT [POIQuests] OFF

SET IDENTITY_INSERT [NotableLocation] ON
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (1, 'Righteous Brand Barracks', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (2, 'Marrils Cabin', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (3, 'Castle Ungebroch', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (4, 'Festles Magic Emporium', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (5, 'The Mire', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (6, 'Soltryce Academy', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (7, 'Kortashs Smithy', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (8, 'The Tomb of Angorbaldash', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (9, 'Dragon Seat', 'A large test building with tall test columns that make up the front of the test')
SET IDENTITY_INSERT [NotableLocation] OFF

SET IDENTITY_INSERT [POINotableLocations] ON
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (2, 2, 2)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (3, 3, 3)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (4, 4, 4)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (5, 5, 5)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (6, 6, 6)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (7, 7, 7)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (8, 8, 8)
INSERT INTO [POINotableLocations] ([Id], [NotableLocationId], [POIId]) VALUES (9, 9, 9)
SET IDENTITY_INSERT [POINotableLocations] OFF

SET IDENTITY_INSERT [RandomEncountersTable] ON
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (1, 'Five Bandits and One Bandit Captain')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (2, 'A Young Black Dragon')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (3, 'Four drunk bar patrons')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (4, 'A pair of overzealous Crownsguard')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (5, 'Three hungry bullywugs')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (6, 'A heartbroken djinn whos master just passed')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (7, 'A broken caravan of travelling merchants stuck in the mud outside of the city')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (8, 'An ominous hut the party continues to see as they move forward')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (9, 'An odd-looking fellow is running down the street screaming about ghosts')
SET IDENTITY_INSERT [RandomEncountersTable] OFF

SET IDENTITY_INSERT [POIRandEncounterTables] ON
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (2, 2, 2)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (3, 3, 3)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (4, 4, 4)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (5, 5, 5)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (6, 6, 6)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (7, 7, 7)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (8, 8, 8)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (9, 9, 9)
SET IDENTITY_INSERT [POIRandEncounterTables] OFF


