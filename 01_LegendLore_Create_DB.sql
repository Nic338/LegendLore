﻿USE [master]

IF db_id('LegendLore') IS NULL
CREATE DATABASE [LegendLore]
GO

USE [LegendLore]
GO

DROP TABLE IF EXISTS [POIRandEncounterTables];
DROP TABLE IF EXISTS [RandomEncountersTable];
DROP TABLE IF EXISTS [POINoteableLocations];
DROP TABLE IF EXISTS [NoteableLocation];
DROP TABLE IF EXISTS [POIQuests];
DROP TABLE IF EXISTS [Quest];
DROP TABLE IF EXISTS [POINPCs];
DROP TABLE IF EXISTS [NPC];
DROP TABLE IF EXISTS [MapPOIs];
DROP TABLE IF EXISTS [Map];
DROP TABLE IF EXISTS [POI];
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

CREATE TABLE [dbo].[POI] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[Map] (
    [Id]         INT            IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (255) NOT NULL,
    [CampaignId] INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Map_Campaign] FOREIGN KEY ([CampaignId]) REFERENCES [dbo].[Campaigns] ([Id]),
)

CREATE TABLE [dbo].[MapPOIs] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Coordinates] NVARCHAR (255) NOT NULL,
    [MapId]       INT            NOT NULL,
    [POIId]       INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_MapPOI_Map] FOREIGN KEY ([MapId]) REFERENCES [dbo].[Map] ([Id]),
    CONSTRAINT [FK_MapPOI_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id])
)

CREATE TABLE [dbo].[NPC] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[POINPCs] (
    [Id]    INT IDENTITY (1, 1) NOT NULL,
    [NPCId] INT NOT NULL,
    [POIId] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_POINPCs_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]),
    CONSTRAINT [FK_POINPCS_NPC] FOREIGN KEY ([NPCId]) REFERENCES [dbo].[NPC] ([Id])
)


CREATE TABLE [dbo].[Quest] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    [Reward]      NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[POIQuests] (
    [Id]      INT IDENTITY (1, 1) NOT NULL,
    [QuestId] INT NOT NULL,
    [POIId]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
   CONSTRAINT [FK_POIQuests_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]),
   CONSTRAINT [FK_POIQuests_Quest] FOREIGN KEY ([QuestId]) REFERENCES [dbo].[Quest] ([Id])
)

CREATE TABLE [dbo].[NotableLocation] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[POINoteableLocations] (
    [Id]                 INT IDENTITY (1, 1) NOT NULL,
    [NoteableLocationId] INT NOT NULL,
    [POIId]              INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
   CONSTRAINT [FK_POINoteableLocations_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]),
   CONSTRAINT [FK_POINoteableLocations_NoteableLocation] FOREIGN KEY ([NoteableLocationId]) REFERENCES [dbo].[NotableLocation] ([Id])
)

CREATE TABLE [dbo].[RandomEncountersTable] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [Encounter] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[POIRandEncounterTables] (
    [Id]                    INT IDENTITY (1, 1) NOT NULL,
    [RandEncountersTableId] INT NOT NULL,
    [POIId]                 INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_POIRandEncounterTables_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]),
    CONSTRAINT [FK_POIRandEncounterTables_RandEncountersTable] FOREIGN KEY ([RandEncountersTableId]) REFERENCES [dbo].[RandomEncountersTable] ([Id])
)

GO
