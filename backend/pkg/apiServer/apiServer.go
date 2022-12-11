package apiServer

import (
	"data-graph-backend/pkg/dbConnector"
	"data-graph-backend/pkg/properties"
	"log"
	"net/http"
)

const (
	bindAddr = ":7328"
)

func Start(config *properties.Config) error {
	dbConnection, err := dbConnector.NewConnection(config)
	if err != nil {
		log.Fatal("Can't connect to db - ", err.Error())
	}

	router := &Router{
		dbConnector: dbConnection,
	}

	configureRouters(router)

	log.Println("Listening on " + bindAddr)
	return http.ListenAndServe(bindAddr, nil)
}
