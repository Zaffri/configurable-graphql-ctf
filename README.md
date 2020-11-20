# Configurable GraphQL CTF

This is an intentionally vulnerable GraphQL API in a capture the flag (CTF) style format. Out of the box it comes with 5 configurable challenge modules. Configurators should be able to configure challenge difficulty as well as switch challenges on and off. All challenge modules have a common theme of Ecommerce.

The challenges are based on;
- Broken Authentication
- Misconfigured Access Control
- Malicious Queries
- SQL Injection
- Custom Scalar Validation

---

Contents
1. Challenge Configuration
2. Running your own CTF
3. Developing Custom Challenges (extenability)

## 1. Challenge Configuration

## 2. Running your own CTF

## 3. Developing Custom Challenges (extenability)
The system is intended to be extensible with the idea that other developers should be able to develop and plug in their own CTF challenge modules, however, due to GraphQL's nature there are some design considerations to be made aware of before doing this.

### Shared Types
Some challenge modules may share types e.g. module 1 and 2 both may depend on a type "User". GraphQL will not allow a type to be defined twice, therefore modules should simply extend the type. This is done by defining the type outside the challenge module in a "core schema" (shared), then each module uses the "extend" keyword to add their relevant fields. 

One issue is that when defining a type in the core schema it must not be empty as GraphQL will throw an error when an empty type is supplied. This is tackled by providing default/generic fields which will be present at all times. These can be used by other modules or not used and act as dummy fields to throw the user off.

Since these default fields are defined outside the modules, they cannot be configured so they are present at all times - to ensure shared types are never empty.

### Shared Fields
Similar to types, fields cannot be defined more than once as GraphQL will also throw an error. These can also be defined in the core schema along with the shared types. As mentioned above, they will be present at all times and cannot be turned off using configuration.

### Queries and Mutations
Resolvers for queries and mutations sit on a challenge module level, therefore the application has to "stitch" them together before building the complete API schema. The way that the stitching is done is that any duplicate resolver names will be overwritten by the last one that is found. Usually GraphQL would throw an error when a resolver is defined twice but the stitching process will only allow one. This means you may not see any errors if you have duplicates, therefore it is important to keep an eye out for this. If a resolver is not being executed then it may be because it is overwritten by a duplicate. In the future I may add a check for unique resolvers.

### Challenge module structure


## TODO
- Get schema builder working
- Build challenge modules
- Add vulnerable config feature
