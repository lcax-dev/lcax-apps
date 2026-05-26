---
name: developer
description: Implement the requested changes using TDD and verify with tests.
skills: ['tdd', 'diagnose']
allowPromptArgument: true
---

# TASK

Implement the changes for:
$prompt

1. Create a branch name using the format `junie/{id}-{slug}`.
2. Use RGR (Red-Green-Refactor) and the TDD skill if applicable to complete the task.
3. RED: write one test
4. GREEN: write the implementation to pass that test
5. REPEAT until done
6. REFACTOR the code
7. Before finishing, run `npm run check` and `npm run test` to ensure the tests pass.
8. Once complete, output <promise>COMPLETE</promise>.