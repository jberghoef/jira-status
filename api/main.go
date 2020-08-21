package api

import (
	"os"

	"github.com/gin-gonic/gin"
)

// Start ...
func Start() {
	r := gin.Default()

	api := r.Group("/api")
	{
		api.GET("/projects", GetProjectsRoute)
		api.GET("/version/:versionID/counts", GetVersionIssueCountsRoute)
		api.GET("/version/:versionID/unresolved", GetVersionUnresolvedIssueCountRoute)
		api.GET("/boards/:projectKey", GetBoardsForProjectRoute)
		api.GET("/sprints/:boardID", GetSprintsForBoardRoute)
		api.GET("/issues/:sprintID", GetIssuesForSprintRoute)
	}

	r.NoRoute(func(c *gin.Context) {
		path := "./build" + c.Request.URL.EscapedPath()
		if _, err := os.Stat(path); err == nil {
			c.File(path)
		} else if os.IsNotExist(err) {
			c.File("./build/index.html")
		}
	})

	r.Run("0.0.0.0:8000")
}
