# Configurable GraphQL CTF
This is currently a WIP...
## TODO / features
- ~~add extend GraphQL context functionality~~
- pass module paths as dependency to configuration setup, as the tests currently rely on configured modules! i.e. testing not possible in some scenarios
- ~~build broken-auth - scenario 1~~
- build broken-auth - scenario 2 - got working, however I've commented out "none" algorithm check out directly in node_module. Will need to find another version that allows "none" or fork and create my own version. Will comeback to this - the check/message thats causing issues is "jwt signature is required". Look at updating this to allow users to define their own algorithm, i.e. user should be able to change algorithm to none, modify payload to retrieve flag.
- ~~build access-control - scenario 1~~
- build access-control - scenario 2
- build scalar-validation - scenario 1
- build malicious-queries - scenario 1
- build malicious-queries - scenario 2
- build sql-injection - scenario 1
- build sql-injection - scenario 2
- challenge module unit test
- add safety check to ensure all modules have a flag set! Add flag to Challenge class.
- Add vulnerable config feature
- add level config so that each level can have "extendsConfig" set. Otherwise when switching between modules the user has to set "extendsConfig" depending on the level!
- replace fs in configuration class to use dynamic typescript import, just like schemabuilder
- make schema.ts optional? some challenges may not require schema additons if they share core schema
- add check for duplicate resolvers?at present user does not get error

---

This is an intentionally vulnerable GraphQL API in a capture the flag (CTF) style format. Out of the box it comes with 5 configurable challenge modules. Configurators should be able to configure challenge difficulty as well as switch challenges on and off. All challenge modules have a common theme of Ecommerce.

The challenges are based on;
- Broken Authentication
- Misconfigured Access Control
- Malicious Queries
- SQL Injection
- Custom Scalar Validation

---

Contents
1. Installation
2. Challenge Configuration
3. Running your own CTF
4. Developing Custom Challenges (extenability)

## 1. Installation

## 2. Challenge Configuration
General challenge configuration can be managed in config.json of the root of the challenge module folder e.g. `./src/modules/challenge-1/config.json`, however, module declaration happens outside the module at `./src/modules/challenge-list.json` - you can read more about this below.

### Enable/Disable Challenge Modules
All challenges modules are declared in the following file `./src/modules/challenge-list.json`. There is an `enabled` (boolean) flag in this file which will turn challenges on or off. The API will read from this file and only use the enabled modules to build the schema. Any modules which have `enabled` marked as false will be excluded.

The reason this is not declared on a module level is because its easier for the API to read from one file where modules are declared rather than looping through all module folders and reading individual module config files.

### Difficulty Levels Option
The difficulty can be managed from the modules configuration file at `./src/modules/${challenge-name}/config.json`. The setting is called "level" and it is a string. Specifically the string must be equal to the name of the difficulty level folder inside the modules "levels" folder. For example consider the following module's folder structure.

```
modules
---- challenge-1
-------- levels
------------ 1
------------ 2
-------- config.json
```

Typically the name of the levels will be made up by the developer of the module, but the conventions I used for the names of the default challenges will simply be in a number format and the higher the number then the more difficult the challenge. This convention is for simplicity. As you can see, challenge-1 has two levels called "1" and "2". This means that inside the config for challenge-1 I could set the "level" to "1" if I wanted the easiest challenge or "2" for the hardest. e.g.

```
{
    "name": "challenge-1",
    "description": "This is challenge 1",
    "level": "1",
    "vulnerable": true
}
```

This config will tell the API to load in the schema and resolvers for challenge-1, specifically the code for difficulty level 1. The code being loaded in would be located at;

`./src/modules/challenge-1/levels/1/*`

### Vulnerable Option
This feature is still to be added ...

## 3. Running your own CTF
This application is simply a vulnerable GraphQL target, it has no features for flag submission, user, teams or scoreboards. If you are looking for this type of functionality you could use a platform such as CTFd along side it.

## 4. Developing Custom Challenges (extensibility)
The system is intended to be extensible with the idea that other developers should be able to develop and plug in their own CTF challenge modules, however, due to GraphQL's nature there are some design considerations to be made aware of before doing this. Additionally, the application has been designed in such a way that specific conventions should be followed, these are defined below.

### 4.1 Declaring a New Challenge Module


### 4.2 Setting up your module structure

### 4.3 Creating the schema

### 4.4 Creating the resolvers

### 4.5 Extending the context

### 4.6 Design Consideration: Shared Types
Some challenge modules may share types e.g. module 1 and 2 both may depend on a type "User". GraphQL will not allow a type to be defined twice, therefore modules should simply extend the type. This is done by defining the type outside the challenge module in a "core schema" (shared), then each module uses the "extend" keyword to add their relevant fields. 

One issue is that when defining a type in the core schema it must not be empty as GraphQL will throw an error when an empty type is supplied. This is tackled by providing default/generic fields which will be present at all times. These can be used by other modules or not used and act as dummy fields to throw the user off.

Since these default fields are defined outside the modules, they cannot be configured so they are present at all times - to ensure shared types are never empty.

Note: types will not need to be shared across challenge levels e.g. if "challenge-1" has difficulty levels "1" and "2", since only one can be active at once present at once then the type does not need to exist in the core schema.

### 4.7 Design Consideration: Shared Fields
Similar to types, fields cannot be defined more than once as GraphQL will also throw an error. These can also be defined in the core schema along with the shared types. As mentioned above, they will be present at all times and cannot be turned off using configuration.

Like shared types (4.5), shared fields do not need to be shared across a challenges difficulties, unless the difficulty levels are from different challenges.

### 4.8 Design Consideration: Queries and Mutations
Resolvers for queries and mutations sit on a challenge module level, therefore the application has to "stitch" them together before building the complete API schema. The way that the stitching is done is that any duplicate resolver names will be overwritten by the last one that is found. Usually GraphQL would throw an error when a resolver is defined twice but the stitching process will only allow one. This means you may not see any errors if you have duplicates, therefore it is important to keep an eye out for this. If a resolver is not being executed then it may be because it is overwritten by a duplicate. In the future I may add a check for unique resolvers.

### 4.8 Design Consideration: Extending GraphQL context
Multiple challenge modules can extend GraphQL context, although you have to beware of context conflicts e.g. one challenge may add a user object to context and another may also add a user object. At present there is no logic to merge these values, instead they will be overwritted. This may be a feature in future to allow context changes to be merged to avoid overwrites.

### 4.9 Design Consideration: Shared Dependencies
...
