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
INSERT INTO [Campaigns] ([Id], [Description], [Map], [UserProfileId], [Title], [CreateDateTime]) VALUES (1, 'This is a test description for a campaign', 'https://i.pinimg.com/564x/3c/e2/70/3ce270f365c53b6274a3f3c5eef30be9.jpg', 1, 'Test Title', '2023-07-28');
INSERT INTO [Campaigns] ([Id], [Description], [Map], [UserProfileId], [Title], [CreateDateTime]) VALUES (2, 'This is a test description for a campaign', 'https://i.pinimg.com/564x/3c/e2/70/3ce270f365c53b6274a3f3c5eef30be9.jpg', 2, 'Test Title 2', '2023-07-28');
INSERT INTO [Campaigns] ([Id], [Description], [Map], [UserProfileId], [Title], [CreateDateTime]) VALUES (3, 'This is a test description for a campaign', 'https://i.pinimg.com/564x/3c/e2/70/3ce270f365c53b6274a3f3c5eef30be9.jpg', 3, 'Test Title 3', '2023-07-28');
SET IDENTITY_INSERT [Campaigns] OFF

SET IDENTITY_INSERT [POI] ON
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (1, 'Test POI Name', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (2, 'Test POI Name', 'This is a test description for a POI') 
INSERT INTO [POI] ([Id], [Name], [Description]) VALUES (3, 'Test POI Name', 'This is a test description for a POI') 
SET IDENTITY_INSERT [POI] OFF

SET IDENTITY_INSERT [Map] ON
INSERT INTO [Map] ([Id], [Name], [CampaignId]) VALUES (1, 'Test Map 1', 1)
INSERT INTO [Map] ([Id], [Name], [CampaignId]) VALUES (2, 'Test Map 2', 2)
INSERT INTO [Map] ([Id], [Name], [CampaignId]) VALUES (3, 'Test Map 3', 3)
SET IDENTITY_INSERT [Map] OFF

SET IDENTITY_INSERT [MapPOIs] ON
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (1, '55, 25', 1, 1)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (2, '50, 30', 1, 2)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (3, '45, 20', 1, 3)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (4, '55, 25', 2, 4)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (5, '50, 30', 2, 5)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (6, '45, 20', 2, 6)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (7, '55, 25', 3, 7)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (8, '50, 30', 3, 8)
INSERT INTO [MapPOIs] ([Id], [Coordinates], [MapId], [POIId]) VALUES (9, '45, 20', 3, 9)
SET IDENTITY_INSERT [MapPOIs] OFF

SET IDENTITY_INSERT [NPC] ON
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (1, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (2, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (3, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (4, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (5, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (6, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (7, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (8, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (9, 'Test NPC', 'This NPC is used as test data for you to test this app')
SET IDENTITY_INSERT [NPC] OFF

SET IDENTITY_INSERT [POINPCs] ON
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (2, 2, 1)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (3, 3, 1)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (4, 4, 2)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (5, 5, 2)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (6, 6, 2)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (7, 7, 3)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (8, 8, 3)
INSERT INTO [POINPCs] ([Id], [NPCId], [POIId]) VALUES (9, 9, 3)
SET IDENTITY_INSERT [POINPCs] OFF

SET IDENTITY_INSERT [Quest] ON
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (1, 'Test Quest 1', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (2, 'Test Quest 2', 'This quest was made up to give seed data for this app', 'The reward for this quest was the friends we made along the way')
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (3, 'Test Quest 3', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (4, 'Test Quest 4', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (5, 'Test Quest 5', 'This quest was made up to give seed data for this app', 'The reward for this quest was the friends we made along the way')
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (6, 'Test Quest 6', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (7, 'Test Quest 7', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (8, 'Test Quest 8', 'This quest was made up to give seed data for this app', 'The reward for this quest was the friends we made along the way')
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (9, 'Test Quest 9', 'This quest was made up to give seed data for this app', NULL)
SET IDENTITY_INSERT [Quest] OFF

SET IDENTITY_INSERT [POIQuests] ON
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (2, 2, 1)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (3, 3, 1)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (4, 4, 2)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (5, 5, 2)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (6, 6, 2)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (7, 7, 3)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (8, 8, 3)
INSERT INTO [POIQuests] ([Id], [QuestId], [POIId]) VALUES (9, 9, 3)
SET IDENTITY_INSERT [POIQuests] OFF

SET IDENTITY_INSERT [NoteableLocation] ON
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (1, 'Test Location 1', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (2, 'Test Location 2', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (3, 'Test Location 3', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (4, 'Test Location 4', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (5, 'Test Location 5', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (6, 'Test Location 6', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (7, 'Test Location 7', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (8, 'Test Location 8', 'A large test building with tall test columns that make up the front of the test')
INSERT INTO [NotableLocation] ([Id], [Name], [Description]) VALUES (9, 'Test Location 9', 'A large test building with tall test columns that make up the front of the test')
SET IDENTITY_INSERT [NoteableLocation] OFF

SET IDENTITY_INSERT [POINoteableLocations] ON
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (2, 2, 1)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (3, 3, 1)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (4, 4, 2)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (5, 5, 2)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (6, 6, 2)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (7, 7, 3)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (8, 8, 3)
INSERT INTO [POINoteableLocations] ([Id], [NoteableLocationId], [POIId]) VALUES (9, 9, 3)
SET IDENTITY_INSERT [POINoteableLocations] OFF

SET IDENTITY_INSERT [RandomEncountersTable] ON
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (1, 'A large group of test encounters')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (2, 'A small group of test encounters')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (3, 'A singular test encounter')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (4, 'A large group of test encounters')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (5, 'A small group of test encounters')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (6, 'A singular test encounter')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (7, 'A large group of test encounters')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (8, 'A small group of test encounters')
INSERT INTO [RandomEncountersTable] ([Id], [Encounter]) VALUES (9, 'A singular test encounter')
SET IDENTITY_INSERT [RandomEncountersTable] OFF

SET IDENTITY_INSERT [POIRandEncounterTables] ON
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (1, 1, 1)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (2, 2, 1)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (3, 3, 1)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (4, 4, 2)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (5, 5, 2)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (6, 6, 2)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (7, 7, 3)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (8, 8, 3)
INSERT INTO [POIRandEncounterTables] ([Id], [RandEncountersTableId], [POIId]) VALUES (9, 9, 3)
SET IDENTITY_INSERT [POIRandEncounterTables] OFF


