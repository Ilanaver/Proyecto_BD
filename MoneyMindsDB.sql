USE [master]
GO
/****** Object:  Database [MoneyMindsDB]    Script Date: 3/6/2024 10:40:29 ******/
CREATE DATABASE [MoneyMindsDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MoneyMindsDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\MoneyMindsDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MoneyMindsDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\MoneyMindsDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MoneyMindsDB] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MoneyMindsDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MoneyMindsDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MoneyMindsDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MoneyMindsDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MoneyMindsDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MoneyMindsDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET RECOVERY FULL 
GO
ALTER DATABASE [MoneyMindsDB] SET  MULTI_USER 
GO
ALTER DATABASE [MoneyMindsDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MoneyMindsDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MoneyMindsDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MoneyMindsDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MoneyMindsDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'MoneyMindsDB', N'ON'
GO
ALTER DATABASE [MoneyMindsDB] SET QUERY_STORE = OFF
GO
USE [MoneyMindsDB]
GO
/****** Object:  User [alumno]    Script Date: 3/6/2024 10:40:29 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Asesor]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Asesor](
	[IdAsesor] [int] IDENTITY(1,1) NOT NULL,
	[IdPerfil_FK] [int] NOT NULL,
	[Mensaje] [varchar](500) NOT NULL,
	[Fecha] [datetime] NOT NULL,
 CONSTRAINT [PK_Asesor] PRIMARY KEY CLUSTERED 
(
	[IdAsesor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContenidoAudiovisual]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContenidoAudiovisual](
	[IdVideo] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[VideoLink] [varchar](150) NOT NULL,
	[Img] [varchar](50) NOT NULL,
	[Descripcion] [varchar](250) NULL,
 CONSTRAINT [PK_ContenidoAudiovisual] PRIMARY KEY CLUSTERED 
(
	[IdVideo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DefinicionTerminos]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DefinicionTerminos](
	[IdTermino] [int] IDENTITY(1,1) NOT NULL,
	[Titulo] [varchar](50) NOT NULL,
	[Contenido] [varchar](450) NOT NULL,
	[img] [varchar](150) NULL,
 CONSTRAINT [PK_DefinicionTerminos] PRIMARY KEY CLUSTERED 
(
	[IdTermino] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gestor]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gestor](
	[IdGestor] [int] IDENTITY(1,1) NOT NULL,
	[IdPerfil_FK] [int] NOT NULL,
	[IdTipos_FK] [int] NOT NULL,
	[IdSubTipo_FK] [int] NOT NULL,
	[Importe] [int] NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Observaciones] [varchar](250) NULL,
 CONSTRAINT [PK_Gestor] PRIMARY KEY CLUSTERED 
(
	[IdGestor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Perfil]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Perfil](
	[IdPerfil] [int] IDENTITY(1,1) NOT NULL,
	[Tipo] [bit] NOT NULL,
	[Nombre] [varchar](50) NOT NULL,
	[Apellido] [varchar](50) NULL,
	[Foto] [varchar](250) NULL,
	[Mail] [varchar](50) NOT NULL,
	[Contraseña] [varchar](50) NOT NULL,
	[Pasatiempo] [varchar](50) NULL,
	[Conocimiento] [varchar](50) NULL,
	[UltActividad] [varchar](50) NULL,
 CONSTRAINT [PK_Perfil] PRIMARY KEY CLUSTERED 
(
	[IdPerfil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SubTipoMovimiento]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubTipoMovimiento](
	[IdSubTipo] [int] IDENTITY(1,1) NOT NULL,
	[IdTipos_FK] [int] NOT NULL,
	[Descripcion] [varchar](250) NULL,
 CONSTRAINT [PK_SubTipoMovimiento] PRIMARY KEY CLUSTERED 
(
	[IdSubTipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tipos]    Script Date: 3/6/2024 10:40:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tipos](
	[IdTipos] [int] IDENTITY(1,1) NOT NULL,
	[Descripcion] [varchar](250) NOT NULL,
 CONSTRAINT [PK_Tipos] PRIMARY KEY CLUSTERED 
(
	[IdTipos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Asesor]  WITH CHECK ADD  CONSTRAINT [FK_Asesor_Perfil] FOREIGN KEY([IdPerfil_FK])
REFERENCES [dbo].[Perfil] ([IdPerfil])
GO
ALTER TABLE [dbo].[Asesor] CHECK CONSTRAINT [FK_Asesor_Perfil]
GO
ALTER TABLE [dbo].[Gestor]  WITH CHECK ADD  CONSTRAINT [FK_Gestor_Perfil] FOREIGN KEY([IdPerfil_FK])
REFERENCES [dbo].[Perfil] ([IdPerfil])
GO
ALTER TABLE [dbo].[Gestor] CHECK CONSTRAINT [FK_Gestor_Perfil]
GO
ALTER TABLE [dbo].[Gestor]  WITH CHECK ADD  CONSTRAINT [FK_Gestor_SubTipoMovimiento] FOREIGN KEY([IdSubTipo_FK])
REFERENCES [dbo].[SubTipoMovimiento] ([IdSubTipo])
GO
ALTER TABLE [dbo].[Gestor] CHECK CONSTRAINT [FK_Gestor_SubTipoMovimiento]
GO
ALTER TABLE [dbo].[Gestor]  WITH CHECK ADD  CONSTRAINT [FK_Gestor_Tipos] FOREIGN KEY([IdTipos_FK])
REFERENCES [dbo].[Tipos] ([IdTipos])
GO
ALTER TABLE [dbo].[Gestor] CHECK CONSTRAINT [FK_Gestor_Tipos]
GO
ALTER TABLE [dbo].[SubTipoMovimiento]  WITH CHECK ADD  CONSTRAINT [FK_SubTipoMovimiento_Tipos] FOREIGN KEY([IdTipos_FK])
REFERENCES [dbo].[Tipos] ([IdTipos])
GO
ALTER TABLE [dbo].[SubTipoMovimiento] CHECK CONSTRAINT [FK_SubTipoMovimiento_Tipos]
GO
USE [master]
GO
ALTER DATABASE [MoneyMindsDB] SET  READ_WRITE 
GO
