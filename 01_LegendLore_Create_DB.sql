USE [master]

IF db_id('LegendLore') IS NULL
CREATE DATABASE [LegendLore]
GO

USE [LegendLore]
GO

DROP TABLE IF EXISTS [Map];
DROP TABLE IF EXISTS [POI];
DROP TABLE IF EXISTS [RandomEncountersTable];
DROP TABLE IF EXISTS [NoteableLocation];
DROP TABLE IF EXISTS [Quest];
DROP TABLE IF EXISTS [NPC];
DROP TABLE IF EXISTS [Campaigns];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
GO


CREATE TABLE [dbo].[UserType] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (20) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)


CREATE TABLE [dbo].[UserProfile] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [UserName]   NVARCHAR (255) NOT NULL,
    [Email]      NVARCHAR (255) NOT NULL,
    [FirstName]  NVARCHAR (50)  NOT NULL,
    [LastName]   NVARCHAR (50)  NOT NULL,
    [UserTypeId] INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [dbo].[UserType] ([Id])
)


CREATE TABLE [dbo].[Campaigns] (
    [Id]             INT            IDENTITY (1, 1) NOT NULL,
    [Description]    NVARCHAR (255) NOT NULL,
    [Map]            NVARCHAR (255) NOT NULL,
    [UserProfileId]  INT            NOT NULL,
    [Title]          NVARCHAR (255) NOT NULL,
    [CreateDateTime] DATETIME       NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Campaign_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [dbo].[UserProfile] ([Id])
)


CREATE TABLE [dbo].[NPC] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)


CREATE TABLE [dbo].[Quest] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    [Reward]      NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)


CREATE TABLE [dbo].[NotableLocation] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)


CREATE TABLE [dbo].[RandomEncountersTable] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Encounter] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)


CREATE TABLE [dbo].[POI] (
    [Id]               INT            IDENTITY (1, 1) NOT NULL,
    [Name]             NVARCHAR (255) NOT NULL,
    [Description]      NVARCHAR (255) NOT NULL,
    [NPCId]            INT            NULL,
    [QuestId]          INT            NULL,
    [LocationId]       INT            NULL,
    [RandEncountersId] INT            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_POI_NPC] FOREIGN KEY ([NPCId]) REFERENCES [dbo].[NPC] ([Id]),
    CONSTRAINT [FK_POI_Quest] FOREIGN KEY ([QuestId]) REFERENCES [dbo].[Quest] ([Id]),
    CONSTRAINT [FK_POI_Location] FOREIGN KEY ([LocationId]) REFERENCES [dbo].[NotableLocation] ([Id]),
    CONSTRAINT [FK_POI_RandEncounters] FOREIGN KEY ([RandEncountersId]) REFERENCES [dbo].[RandomEncountersTable] ([Id])
)


CREATE TABLE [dbo].[Map] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (255) NOT NULL,
    [POIId]      INT            NULL,
    [CampaignId] INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Map_Campaign] FOREIGN KEY ([CampaignId]) REFERENCES [dbo].[Campaigns] ([Id]),
    CONSTRAINT [FK_Map_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id])
)
GO
