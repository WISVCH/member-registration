package server

import (
	"fmt"
	"github.com/WISVCH/member-registration/config"
	"github.com/WISVCH/member-registration/entities"
	dbRepo "github.com/WISVCH/member-registration/server/data/repositories/db"
	"github.com/WISVCH/member-registration/server/middleware"
	"github.com/WISVCH/member-registration/server/utils/auth"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/GeertJohan/go.rice"
	"strconv"
)

type GinServer struct {
	port   int
	Router *gin.Engine
}

func Start(c config.Config) error {
	fmt.Println("Starting server")
	connStr := c.DatabaseConnectionString()
	dbConn, err := sqlx.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	db := dbRepo.InitDBRepo(dbConn)
	handlerInteractor := entities.HandlerInteractor{
		DB:                        db,
		RegisterDefaultMiddleware: getDefaultMiddleware(),
		ApplicationUrl: c.Domain,
	}
	auth.Connect(c.ConnectUrl, c.ConnectClientId, c.ClientSecret, c.RedirectUrl, c.AllowedLdap)
	server := newServer(c.ServerPort, c.IsDevMode, handlerInteractor, c)
	return server.Start()
}

func newServer(port int, debug bool, hi entities.HandlerInteractor, c config.Config) GinServer {
	server := GinServer{}
	server.port = port
	server.Router = gin.New()
	if debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	r := server.Router
	r.LoadHTMLGlob("./resources/templates/*")
	// servers other static files
	staticBox := rice.MustFindBox("../resources/static")
	r.StaticFS("static", staticBox.HTTPBox())

	hi.RegisterDefaultMiddleware(r)
	registerPublicRoutes(r.Group(""), hi)
	registerAdminRoutes(r.Group("/admin"), hi, c)
	registerApiRoutes(r.Group("/api"), hi)
	registerAuthRoutes(r.Group("/auth"), hi)

	return server
}

func getDefaultMiddleware() func(router entities.MiddlewareRegisterable) {
	return func(router entities.MiddlewareRegisterable) {
		router.Use(gin.Recovery())
		router.Use(middleware.GinLogger())
	}
}

func (s GinServer) Start() error {
	return s.Router.Run(":" + strconv.Itoa(s.port))
}
