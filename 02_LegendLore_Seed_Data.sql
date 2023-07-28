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

SET IDENTITY_INSERT [NPC] ON
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (1, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (2, 'Test NPC', 'This NPC is used as test data for you to test this app')
INSERT INTO [NPC] ([Id], [Name], [Description]) VALUES (3, 'Test NPC', 'This NPC is used as test data for you to test this app')
SET IDENTITY_INSERT [NPC] OFF

SET IDENTITY_INSERT [Quest] ON
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (1, 'Test Quest 1', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (1, 'Test Quest 1', 'This quest was made up to give seed data for this app', NULL)
INSERT INTO [Quest] ([Id], [Title], [Description], [Reward]) VALUES (1, 'Test Quest 1', 'This quest was made up to give seed data for this app', NULL)
SET IDENTITY_INSERT [Quest] OFF

