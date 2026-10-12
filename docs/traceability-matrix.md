# Requirements Traceability Matrix

| ID            | Feature     | Scenario                           | Automation |
| ------------- | ----------- | ---------------------------------- | ---------- |
| TC-LOGIN-001  | Login       | Valid credentials                  | Yes        |
| TC-LOGIN-002  | Login       | Invalid credentials                | Yes        |
| TC-LOGIN-003  | Login       | Empty username                     | Yes        |
| TC-LOGIN-004  | Login       | Empty password                     | Yes        |
| TC-DASH-001   | Dashboard   | Dashboard loads                    | Yes        |
| TC-DASH-002   | Dashboard   | Dashboard URL                      | Yes        |
| TC-DASH-003   | Dashboard   | Dashboard content                  | Yes        |
| TC-DASH-004   | Dashboard   | Open user menu                     | Yes        |
| TC-DASH-005   | Dashboard   | Logout from user menu              | Yes        |
| TC-NAV-001    | Navigation  | Admin menu                         | Yes        |
| TC-NAV-002    | Navigation  | PIM menu                           | Yes        |
| TC-NAV-003    | Navigation  | Leave menu                         | Yes        |
| TC-NAV-004    | Navigation  | Time menu                          | Yes        |
| TC-NAV-005    | Navigation  | Recruitment menu                   | Yes        |
| TC-NAV-006    | Navigation  | My Info menu                       | Yes        |
| TC-PIM-001    | PIM         | Open PIM                           | Yes        |
| TC-PIM-002    | PIM         | Employee list                      | Yes        |
| TC-PIM-003    | PIM         | Search controls                    | Yes        |
| TC-ADMIN-001  | Admin       | Open Admin                         | Yes        |
| TC-ADMIN-002  | Admin       | Search user                        | Yes        |
| TC-ADMIN-003  | Admin       | Reset user filters                 | Yes        |
| TC-ADMIN-004  | Admin       | Add user                           | Planned    |
| TC-ADMIN-005  | Admin       | Duplicate username                 | Planned    |
| TC-ADMIN-006  | Admin       | Delete user                        | Planned    |
| TC-LEAVE-001  | Leave       | Open Leave                         | Yes        |
| TC-LEAVE-002  | Leave       | Leave navigation                   | Yes        |
| TC-LEAVE-003  | Leave       | Apply leave form                   | Yes        |
| TC-LEAVE-004  | Leave       | Submit leave with required data    | Yes*       |
| TC-LEAVE-005  | Leave       | Submit leave without required data | Yes        |
| TC-LEAVE-006  | Leave       | Cancel leave request               | Planned    |
| TC-REC-001    | Recruitment | Open Recruitment                   | Yes        |
| TC-REC-002    | Recruitment | Candidate content                  | Yes        |
| TC-REC-003    | Recruitment | Add candidate                      | Yes        |
| TC-REC-004    | Recruitment | Missing required candidate data    | Yes        |
| TC-REC-005    | Recruitment | Search candidate                   | Yes        |
| TC-TIME-001   | Time        | Open Time                          | Yes        |
| TC-TIME-002   | Time        | Timesheet content                  | Yes        |
| TC-LOGOUT-001 | Logout      | Successful logout                  | Yes        |
| TC-PIM-004    | PIM         | Add employee                       | Yes        |
| TC-PIM-005    | PIM         | Missing required employee data     | Yes        |
| TC-PIM-006    | PIM         | Search existing employee           | Yes        |

`*` The Leave scenarios requiring an `Annual Leave` entitlement are pending when
the shared demo account has no available leave balance.
| TC-PIM-007    | PIM         | Edit employee                      | Yes        |
| TC-PIM-008    | PIM         | Delete employee                    | Yes        |

## Status

This matrix is maintained as automation coverage evolves.
