USE [master]
GO
/****** Object:  Database [MoneyMindsDB]    Script Date: 10/6/2024 10:06:45 ******/
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
/****** Object:  User [alumno]    Script Date: 10/6/2024 10:06:45 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Asesor]    Script Date: 10/6/2024 10:06:45 ******/
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
/****** Object:  Table [dbo].[ContenidoAudiovisual]    Script Date: 10/6/2024 10:06:45 ******/
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
	[Categoria] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ContenidoAudiovisual] PRIMARY KEY CLUSTERED 
(
	[IdVideo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DefinicionTerminos]    Script Date: 10/6/2024 10:06:45 ******/
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
/****** Object:  Table [dbo].[Gestor]    Script Date: 10/6/2024 10:06:45 ******/
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
/****** Object:  Table [dbo].[Perfil]    Script Date: 10/6/2024 10:06:45 ******/
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
/****** Object:  Table [dbo].[SubTipoMovimiento]    Script Date: 10/6/2024 10:06:45 ******/
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
/****** Object:  Table [dbo].[Tipos]    Script Date: 10/6/2024 10:06:45 ******/
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
SET IDENTITY_INSERT [dbo].[ContenidoAudiovisual] ON 

INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (1, N'Introducción a SQL', N'https://example.com/videos/intro_sql', N'img1.jpg', N'Un video introductorio sobre SQL', N'Educativo')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (2, N'Avanzando en Python', N'https://example.com/videos/adv_python', N'img2.jpg', N'Tutorial avanzado de Python', N'Programación')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (3, N'Historia del Arte', N'https://example.com/videos/arte_historia', N'img3.jpg', N'Documental sobre la historia del arte', N'Documental')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (4, N'Fundamentos de Machine Learning', N'https://example.com/videos/ml_basics', N'img4.jpg', N'Conceptos básicos de Machine Learning', N'Tecnología')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (5, N'Cocina Italiana', N'https://example.com/videos/italian_cuisine', N'img5.jpg', N'Recetas de cocina italiana', N'Cocina')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (6, N'Yoga para principiantes', N'https://example.com/videos/yoga_basics', N'img6.jpg', N'Sesión de yoga para principiantes', N'Salud')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (7, N'Astronomía para niños', N'https://example.com/videos/astro_kids', N'img7.jpg', N'Introducción a la astronomía para niños', N'Educativo')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (8, N'Fotografía profesional', N'https://example.com/videos/pro_photography', N'img8.jpg', N'Consejos para fotografía profesional', N'Hobby')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (9, N'Aprende a tocar la guitarra', N'https://example.com/videos/learn_guitar', N'img9.jpg', N'Clases para aprender a tocar la guitarra', N'Música')
INSERT [dbo].[ContenidoAudiovisual] ([IdVideo], [Titulo], [VideoLink], [Img], [Descripcion], [Categoria]) VALUES (10, N'Introducción a la programación en Java', N'https://example.com/videos/java_intro', N'img10.jpg', N'Curso introductorio de programación en Java', N'Programación')
SET IDENTITY_INSERT [dbo].[ContenidoAudiovisual] OFF
GO
SET IDENTITY_INSERT [dbo].[DefinicionTerminos] ON 

INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (1, N'SQL', N'Structured Query Language, es un lenguaje de programación utilizado para gestionar bases de datos relacionales.', N'img_sql.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (2, N'Python', N'Python es un lenguaje de programación interpretado de alto nivel, diseñado para ser fácil de leer y simple de implementar.', N'img_python.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (3, N'Machine Learning', N'Machine Learning es una rama de la inteligencia artificial que se centra en el desarrollo de algoritmos que permiten a las computadoras aprender de los datos.', N'img_ml.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (4, N'Historia del Arte', N'La historia del arte estudia el desarrollo del arte a través del tiempo, considerando factores sociales, políticos y culturales.', N'img_arte.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (5, N'Yoga', N'El yoga es una disciplina física y mental que se originó en la India, enfocada en la meditación y posturas físicas.', N'img_yoga.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (6, N'Astronomía', N'La astronomía es la ciencia que estudia los cuerpos celestes, sus movimientos y fenómenos relacionados.', N'img_astronomy.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (7, N'Fotografía', N'La fotografía es el arte y la técnica de obtener imágenes duraderas debido a la acción de la luz.', N'img_photography.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (8, N'Programación en Java', N'Java es un lenguaje de programación de propósito general, concurrente y basado en clases, diseñado para tener las menos dependencias posibles.', N'img_java.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (9, N'Guitarra', N'La guitarra es un instrumento musical de cuerdas pulsadas, compuesto por una caja de resonancia, un mástil sobre el que va adosado el diapasón o trastero, generalmente con un agujero acústico en el centro de la tapa (boca).', N'img_guitar.jpg')
INSERT [dbo].[DefinicionTerminos] ([IdTermino], [Titulo], [Contenido], [img]) VALUES (10, N'Cocina Italiana', N'La cocina italiana es una expresión de las artes culinarias desarrolladas en Italia, rica en sabor y variada en ingredientes.', N'img_italian_cuisine.jpg')
SET IDENTITY_INSERT [dbo].[DefinicionTerminos] OFF
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
/****** Object:  StoredProcedure [dbo].[AddOperaciones]    Script Date: 10/6/2024 10:06:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[AddOperaciones]
@IdGestor int,
@IdPerfil int,
@monto int,
@IdTipos int,
@IdSubTipo int,
@Importe int,
@Fecha datetime,
@Observaciones varchar(250)
as
begin
	insert into Gestor(IdGestor,IdPerfil_FK,IdTipos_FK,IdSubTipo_FK,Importe,Fecha,Observaciones)
	values(@IdGestor,@IdPerfil,@IdTipos,@IdSubTipo,@Importe,@Fecha,@Observaciones)
end
GO
/****** Object:  StoredProcedure [dbo].[BuscarDefiniciones]    Script Date: 10/6/2024 10:06:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[BuscarDefiniciones]
@terminoBuscado varchar(50)
as
begin
	SELECT IdTermino, Titulo, img as Imagen, Contenido 
    FROM DefinicionTerminos 
	WHERE Titulo LIKE '%' + @terminoBuscado + '%'
    ORDER BY Titulo
end
GO
/****** Object:  StoredProcedure [dbo].[DelOperacion]    Script Date: 10/6/2024 10:06:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[DelOperacion]
@idGestor int
AS
begin 
	Delete from Gestor where @idGestor = IdGestor
end
GO
/****** Object:  StoredProcedure [dbo].[ShowDefiniciones]    Script Date: 10/6/2024 10:06:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[ShowDefiniciones]
AS
Begin
Select TOP 5 * from DefinicionTerminos
End
GO
/****** Object:  StoredProcedure [dbo].[ShowOperaciones]    Script Date: 10/6/2024 10:06:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[ShowOperaciones]
@idPerfil int
AS
Begin
select * from Gestor where @idPerfil = IdPerfil_FK
END
GO
/****** Object:  StoredProcedure [dbo].[ShowVideos]    Script Date: 10/6/2024 10:06:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[ShowVideos]
@Categoria varchar(50)
AS
begin
select TOP 6 * from ContenidoAudiovisual where @Categoria = Categoria
end
GO
USE [master]
GO
ALTER DATABASE [MoneyMindsDB] SET  READ_WRITE 
GO
