package api

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

// GetProjectsRoute ...
func GetProjectsRoute(c *gin.Context) {
	jira := GetJiraInstance()
	projectKeys := strings.Split(c.Query("projects"), ",")
	projects, err := jira.GetProjects(projectKeys)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"results": projects,
		"count":   len(projects),
	})
}

// GetVersionIssueCountsRoute ...
func GetVersionIssueCountsRoute(c *gin.Context) {
	versionID := c.Param("versionID")
	jira := GetJiraInstance()
	issueCount, err := jira.GetVersionIssueCount(versionID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": issueCount,
	})
}

// GetVersionUnresolvedIssueCountRoute ...
func GetVersionUnresolvedIssueCountRoute(c *gin.Context) {
	versionID := c.Param("versionID")
	jira := GetJiraInstance()
	issueCount, err := jira.GetVersionUnresolvedIssueCount(versionID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"result": issueCount,
	})
}

// GetBoardsForProjectRoute ...
func GetBoardsForProjectRoute(c *gin.Context) {
	projectKey := c.Param("projectKey")
	jira := GetJiraInstance()
	boards, err := jira.GetBoardsForProject(projectKey)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"results": boards,
		"count":   len(boards),
	})
}

// GetSprintsForBoardRoute ...
func GetSprintsForBoardRoute(c *gin.Context) {
	boardID := c.Param("boardID")
	jira := GetJiraInstance()
	sprints, err := jira.GetSprintsForBoard(boardID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"results": sprints,
		"count":   len(sprints),
	})
}

// GetIssuesForSprintRoute ...
func GetIssuesForSprintRoute(c *gin.Context) {
	sprintID := c.Param("sprintID")
	id, err := strconv.Atoi(sprintID)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	jira := GetJiraInstance()
	issues, err := jira.GetIssuesForSprint(id)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"results": issues,
		"count":   len(issues),
	})
}
