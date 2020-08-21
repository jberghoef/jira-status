export interface CustomFieldUsage {
    fieldName: string;
    customFieldId: number;
    issueCountWithVersionInCustomField: number;
}

export interface VersionIssueCounts {
    self: string;
    issuesFixedCount: number;
    issuesAffectedCount: number;
    issueCountWithCustomFieldsShowingVersion: number;
    customFieldUsage: CustomFieldUsage[];
}

export interface VersionUnresolvedIssuesCount {
    self: string;
    issuesUnresolvedCount: number;
    issuesCount: number;
}
