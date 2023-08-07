USE [master]

IF db_id('LegendLore') IS NULL
CREATE DATABASE [LegendLore]
GO

USE [LegendLore]
GO

DROP TABLE IF EXISTS [POIRandEncounterTables];
DROP TABLE IF EXISTS [RandomEncountersTable];
DROP TABLE IF EXISTS [POINotableLocations];
DROP TABLE IF EXISTS [NotableLocation];
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
    [UserProfileId]  INT            NOT NULL,
    [Title]          NVARCHAR (255) NOT NULL,
    [CreateDateTime] DATETIME       NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Campaign_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [dbo].[UserProfile] ([Id]) ON DELETE CASCADE
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
    [MapImage]   NVARCHAR (255) NOT NULL,
    [CampaignId] INT            NOT NULL,
    [Height]     INT            NULL,
    [Width]      INT            NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Map_Campaign] FOREIGN KEY ([CampaignId]) REFERENCES [dbo].[Campaigns] ([Id]) ON DELETE CASCADE
)

CREATE TABLE [dbo].[MapPOIs] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Coordinates] GEOGRAPHY      NOT NULL,
    [MapId]       INT            NOT NULL,
    [POIId]       INT            NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_MapPOI_Map] FOREIGN KEY ([MapId]) REFERENCES [dbo].[Map] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_MapPOI_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]) ON DELETE CASCADE
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
    CONSTRAINT [FK_POINPCs_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_POINPCS_NPC] FOREIGN KEY ([NPCId]) REFERENCES [dbo].[NPC] ([Id]) ON DELETE CASCADE
)


CREATE TABLE [dbo].[Quest] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (MAX) NOT NULL,
    [Reward]      NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[POIQuests] (
    [Id]      INT IDENTITY (1, 1) NOT NULL,
    [QuestId] INT NOT NULL,
    [POIId]   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
   CONSTRAINT [FK_POIQuests_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]) ON DELETE CASCADE,
   CONSTRAINT [FK_POIQuests_Quest] FOREIGN KEY ([QuestId]) REFERENCES [dbo].[Quest] ([Id]) ON DELETE CASCADE
)

CREATE TABLE [dbo].[NotableLocation] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NOT NULL,
    [Description] NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
)

CREATE TABLE [dbo].[POINotableLocations] (
    [Id]                 INT IDENTITY (1, 1) NOT NULL,
    [NotableLocationId] INT NOT NULL,
    [POIId]              INT NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC),
   CONSTRAINT [FK_POINotableLocations_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]) ON DELETE CASCADE,
   CONSTRAINT [FK_POINotableLocations_NoteableLocation] FOREIGN KEY ([NotableLocationId]) REFERENCES [dbo].[NotableLocation] ([Id]) ON DELETE CASCADE
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
    CONSTRAINT [FK_POIRandEncounterTables_POI] FOREIGN KEY ([POIId]) REFERENCES [dbo].[POI] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_POIRandEncounterTables_RandEncountersTable] FOREIGN KEY ([RandEncountersTableId]) REFERENCES [dbo].[RandomEncountersTable] ([Id]) ON DELETE CASCADE
)

GO
