USE [KistlerDB]
GO
/****** Object:  Table [dbo].[OfferMaster]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OfferMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Item] [varchar](100) NOT NULL,
	[Price] [decimal](4, 0) NOT NULL,
	[Packing] [char](1) NOT NULL,
	[AvailableQty] [smallint] NOT NULL,
 CONSTRAINT [PK_OfferMaster] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[OfferMaster] ON
INSERT [dbo].[OfferMaster] ([Id], [Item], [Price], [Packing], [AvailableQty]) VALUES (1, N'1792 Full Proof', CAST(120 AS Decimal(4, 0)), N'p', 14)
INSERT [dbo].[OfferMaster] ([Id], [Item], [Price], [Packing], [AvailableQty]) VALUES (2, N'200th Anniversary Evan Williams', CAST(200 AS Decimal(4, 0)), N'b', 12)
INSERT [dbo].[OfferMaster] ([Id], [Item], [Price], [Packing], [AvailableQty]) VALUES (3, N'A.H. Hirsch Finest Reserve 20', CAST(123 AS Decimal(4, 0)), N'b', 12)
INSERT [dbo].[OfferMaster] ([Id], [Item], [Price], [Packing], [AvailableQty]) VALUES (4, N'Aberlour 12 Double Cask Matured', CAST(250 AS Decimal(4, 0)), N'p', 4)
INSERT [dbo].[OfferMaster] ([Id], [Item], [Price], [Packing], [AvailableQty]) VALUES (5, N'Aberlour 18 year', CAST(450 AS Decimal(4, 0)), N'b', 6)
SET IDENTITY_INSERT [dbo].[OfferMaster] OFF
/****** Object:  Table [dbo].[OfferDetails]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OfferDetails](
	[Id] [int] NOT NULL,
	[OfferId] [int] NOT NULL,
	[Spec] [varchar](200) NOT NULL
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Setup]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Setup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MKey] [varchar](64) NOT NULL,
	[IntValue] [int] NOT NULL,
	[StringValue] [varchar](256) NULL,
 CONSTRAINT [PK_Setup] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Setup] ON
INSERT [dbo].[Setup] ([Id], [MKey], [IntValue], [StringValue]) VALUES (1, N'MaxOrderNumber', 4, NULL)
SET IDENTITY_INSERT [dbo].[Setup] OFF
/****** Object:  Table [dbo].[UserMaster]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[PwdHash] [varchar](100) NOT NULL,
	[Role] [char](1) NOT NULL,
 CONSTRAINT [PK_UserMaster] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[UserMaster] ON
INSERT [dbo].[UserMaster] ([Id], [Email], [PwdHash], [Role]) VALUES (1, N'sagarwal@netwoven.com', N'dea5687d7786d43266cf55d7be014530', N'u')
INSERT [dbo].[UserMaster] ([Id], [Email], [PwdHash], [Role]) VALUES (4, N'sa@gmail.com', N'abcd', N'U')
INSERT [dbo].[UserMaster] ([Id], [Email], [PwdHash], [Role]) VALUES (5, N'sagarwal1@netwoven.com', N'dea5687d7786d43266cf55d7be014530', N'u')
INSERT [dbo].[UserMaster] ([Id], [Email], [PwdHash], [Role]) VALUES (6, N'capitalch@gmail.com', N'dea5687d7786d43266cf55d7be014530', N'u')
SET IDENTITY_INSERT [dbo].[UserMaster] OFF
/****** Object:  Table [dbo].[UserProfiles]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[UserProfiles](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](256) NOT NULL,
	[LastName] [varchar](256) NOT NULL,
	[Email] [varchar](256) NOT NULL,
	[Phone] [varchar](64) NOT NULL,
	[Birthday] [smalldatetime] NOT NULL,
	[MailingAddress1] [varchar](512) NOT NULL,
	[MailingAddress2] [varchar](512) NULL,
	[MailingCity] [varchar](64) NOT NULL,
	[MailingState] [varchar](64) NOT NULL,
	[MailingZip] [varchar](64) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_UserProfiles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ShippingAddresses]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[ShippingAddresses](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Address1] [varchar](256) NOT NULL,
	[Address2] [varchar](256) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_ShippingAddresses] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[OrderMaster]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[OrderMaster](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MDate] [date] NOT NULL,
	[OrderNo] [varchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[Descr] [varchar](50) NULL,
	[IsDelivered] [bit] NOT NULL,
 CONSTRAINT [PK_OrderMaster] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[OrderMaster] ON
INSERT [dbo].[OrderMaster] ([Id], [MDate], [OrderNo], [UserId], [Descr], [IsDelivered]) VALUES (28, CAST(0x133C0B00 AS Date), N'4', 1, NULL, 0)
SET IDENTITY_INSERT [dbo].[OrderMaster] OFF
/****** Object:  Table [dbo].[OrderDetails]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderDetails](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[OrderId] [int] NOT NULL,
	[OfferId] [int] NOT NULL,
	[OrderQty] [smallint] NOT NULL,
	[WishList] [smallint] NOT NULL,
 CONSTRAINT [PK_OrderDetails] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CreditCards]    Script Date: 11/08/2016 21:03:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CreditCards](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CardName] [varchar](64) NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_CreditCards] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Default [DF_OrderDetails_WishList]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[OrderDetails] ADD  CONSTRAINT [DF_OrderDetails_WishList]  DEFAULT ((0)) FOR [WishList]
GO
/****** Object:  Default [DF_OrderMaster_MDate]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[OrderMaster] ADD  CONSTRAINT [DF_OrderMaster_MDate]  DEFAULT (getdate()) FOR [MDate]
GO
/****** Object:  Default [DF_OrderMaster_IsSupplied]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[OrderMaster] ADD  CONSTRAINT [DF_OrderMaster_IsSupplied]  DEFAULT ((0)) FOR [IsDelivered]
GO
/****** Object:  Default [DF_Setup_IntValue]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[Setup] ADD  CONSTRAINT [DF_Setup_IntValue]  DEFAULT ((0)) FOR [IntValue]
GO
/****** Object:  ForeignKey [FK_CreditCards_UserProfiles]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[CreditCards]  WITH CHECK ADD  CONSTRAINT [FK_CreditCards_UserProfiles] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserProfiles] ([Id])
GO
ALTER TABLE [dbo].[CreditCards] CHECK CONSTRAINT [FK_CreditCards_UserProfiles]
GO
/****** Object:  ForeignKey [FK_OrderDetails_OfferMaster]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_OfferMaster] FOREIGN KEY([OfferId])
REFERENCES [dbo].[OfferMaster] ([Id])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_OfferMaster]
GO
/****** Object:  ForeignKey [FK_OrderDetails_OrderMaster]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[OrderDetails]  WITH CHECK ADD  CONSTRAINT [FK_OrderDetails_OrderMaster] FOREIGN KEY([OrderId])
REFERENCES [dbo].[OrderMaster] ([Id])
GO
ALTER TABLE [dbo].[OrderDetails] CHECK CONSTRAINT [FK_OrderDetails_OrderMaster]
GO
/****** Object:  ForeignKey [FK_OrderMaster_UserMaster]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[OrderMaster]  WITH CHECK ADD  CONSTRAINT [FK_OrderMaster_UserMaster] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserMaster] ([Id])
GO
ALTER TABLE [dbo].[OrderMaster] CHECK CONSTRAINT [FK_OrderMaster_UserMaster]
GO
/****** Object:  ForeignKey [FK_ShippingAddresses_UserMaster]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[ShippingAddresses]  WITH CHECK ADD  CONSTRAINT [FK_ShippingAddresses_UserMaster] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserMaster] ([Id])
GO
ALTER TABLE [dbo].[ShippingAddresses] CHECK CONSTRAINT [FK_ShippingAddresses_UserMaster]
GO
/****** Object:  ForeignKey [FK_UserProfiles_UserMaster]    Script Date: 11/08/2016 21:03:20 ******/
ALTER TABLE [dbo].[UserProfiles]  WITH CHECK ADD  CONSTRAINT [FK_UserProfiles_UserMaster] FOREIGN KEY([UserId])
REFERENCES [dbo].[UserMaster] ([Id])
GO
ALTER TABLE [dbo].[UserProfiles] CHECK CONSTRAINT [FK_UserProfiles_UserMaster]
GO
