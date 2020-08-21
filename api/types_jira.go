package api

// VersionIssueCounts ...
type VersionIssueCounts struct {
	Self                                     string `json:"self"`
	IssuesFixedCount                         int    `json:"issuesFixedCount"`
	IssuesAffectedCount                      int    `json:"issuesAffectedCount"`
	IssueCountWithCustomFieldsShowingVersion int    `json:"issueCountWithCustomFieldsShowingVersion"`
	CustomFieldUsage                         []struct {
		FieldName                          string `json:"fieldName"`
		CustomFieldID                      int    `json:"customFieldId"`
		IssueCountWithVersionInCustomField int    `json:"issueCountWithVersionInCustomField"`
	} `json:"customFieldUsage"`
}

// VersionUnresolvedIssuesCount ...
type VersionUnresolvedIssuesCount struct {
	Self                  string `json:"self"`
	IssuesUnresolvedCount int    `json:"issuesUnresolvedCount"`
	IssuesCount           int    `json:"issuesCount"`
}
