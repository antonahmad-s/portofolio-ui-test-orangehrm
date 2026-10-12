# Leave Test Cases

| ID           | Scenario                           | Expected Result                        | Status    |
| ------------ | ---------------------------------- | -------------------------------------- | --------- |
| TC-LEAVE-001 | Open Leave module                  | Leave page loads                       | Automated |
| TC-LEAVE-002 | Verify leave navigation            | Leave content is visible               | Automated |
| TC-LEAVE-003 | Open Apply Leave                   | Apply Leave form loads                 | Automated |
| TC-LEAVE-004 | Submit leave with required data    | Leave request is submitted             | Automated* |
| TC-LEAVE-005 | Submit leave without required data | Validation is displayed                | Automated |
| TC-LEAVE-006 | Cancel leave request               | Request status changes/cancel succeeds | Planned   |

`*` Requires the logged-in account to have an `Annual Leave` entitlement; the test is
reported as pending when the shared demo account has no available leave balance.
