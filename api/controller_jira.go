package api

import (
	"fmt"
	"log"
	"os"
	"sync"

	jira "github.com/andygrunwald/go-jira"
)

var jiraController *Jira
var storageOnce sync.Once

// GetJiraInstance ...
func GetJiraInstance() *Jira {
	// Create the singleton
	storageOnce.Do(func() {
		jiraController = &Jira{}
		jiraController.start()
	})
	return jiraController
}

// Jira ...
type Jira struct {
	client *jira.Client
}

func (j *Jira) start() {
	transport := jira.BasicAuthTransport{
		Username: os.Getenv("JIRA_USERNAME"),
		Password: os.Getenv("JIRA_TOKEN"),
	}

	client, err := jira.NewClient(transport.Client(), os.Getenv("JIRA_ENDPOINT"))
	if err != nil {
		log.Fatal(err)
	}

	j.client = client
}

// GetProject ...
func (j *Jira) GetProject(projectKey string) (*jira.Project, error) {
	p, _, err := j.client.Project.Get(projectKey)
	return p, err
}

// GetProjects ...
func (j *Jira) GetProjects(projectKeys []string) ([]*jira.Project, error) {
	projects := []*jira.Project{}
	for _, projectKey := range projectKeys {
		p, err := j.GetProject(projectKey)
		if err != nil {
			return projects, err
		}
		projects = append(projects, p)
	}
	return projects, nil
}

// GetVersionIssueCount ...
func (j *Jira) GetVersionIssueCount(versionID string) (VersionIssueCounts, error) {
	endpoint := fmt.Sprintf("rest/api/3/version/%s/relatedIssueCounts", versionID)
	req, _ := j.client.NewRequest("GET", endpoint, nil)
	result := VersionIssueCounts{}
	if _, err := j.client.Do(req, &result); err != nil {
		return result, err
	}
	return result, nil
}

// GetVersionUnresolvedIssueCount ...
func (j *Jira) GetVersionUnresolvedIssueCount(versionID string) (VersionUnresolvedIssuesCount, error) {
	endpoint := fmt.Sprintf("rest/api/3/version/%s/unresolvedIssueCount", versionID)
	req, _ := j.client.NewRequest("GET", endpoint, nil)
	result := VersionUnresolvedIssuesCount{}
	if _, err := j.client.Do(req, &result); err != nil {
		return result, err
	}
	return result, nil
}

// GetBoard ...
func (j *Jira) GetBoard(boardID int) (*jira.Board, error) {
	b, _, err := j.client.Board.GetBoard(boardID)
	return b, err
}

// GetBoardsForProject ...
func (j *Jira) GetBoardsForProject(projectKey string) ([]jira.Board, error) {
	b, _, err := j.client.Board.GetAllBoards(&jira.BoardListOptions{
		ProjectKeyOrID: projectKey,
	})
	return b.Values, err
}

// GetSprintsForBoard ...
func (j *Jira) GetSprintsForBoard(boardID string) ([]jira.Sprint, error) {
	s, _, err := j.client.Board.GetAllSprints(boardID)
	return s, err
}

// GetIssuesForSprint ...
func (j *Jira) GetIssuesForSprint(sprintID int) ([]jira.Issue, error) {
	s, _, err := j.client.Sprint.GetIssuesForSprint(sprintID)
	return s, err
}
