// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import 'react-testing-library/cleanup-after-each';
// this adds jest-dom's custom matchers
import 'jest-dom/extend-expect';

// some global test data for all your tests
global.jobsTestData = [
    {
        title: "Web developer",
        description: "Awesome job with many benefits",
        category: "Information Technology",
        area: "Funen"
    },
    {
        title: "Sales assistant",
        description: "Awesome job with many benefits",
        category: "Sales",
        area: "Central Jutland"
    },
    {
        title: "Junior developer",
        description: "Awesome job with many benefits",
        category: "Information Technology",
        area: "Funen"
    }];