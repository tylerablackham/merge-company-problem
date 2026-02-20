# merge-company-problem

## Description of the Scenario
The scenario is you have two companies in a database (one is a duplicated of the other, entered erroneously by an
employee).

Provide an HTTP interface to merge these two companies together. Include in your solution a way for users to resolve
conflicts when data points differ between the two companies. Ensure your solution also handles the updating of Users
and Branches so that they are associated with the correct, resulting company from the merge.

Suppose that a few months down the road, a different team member needs to add a Credit Limit (an integer) to the
company entity. How might you architect your solution so that your code will be maintained?