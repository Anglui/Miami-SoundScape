# Creating Master Data File

#import each individual file
Allapattah <- read.csv(file = "Allapattah.csv")
Brickell <- read.csv(file = "Brickell.csv")
BuenaVista <- read.csv(file = "Buena Vista.csv")
CoconutGrove <- read.csv(file = "Coconut Grove.csv")
Downtown <- read.csv(file = "Downtown.csv")
Edgewater <- read.csv(file = "Edgewater.csv")
Flagami <- read.csv(file = "Flagami.csv")
Grapeland <- read.csv(file = "Grapeland Heights.csv")
LibertyCity <- read.csv(file = "Liberty City.csv")
Haiti <- read.csv(file = "Little Haiti.csv")
Havana <- read.csv(file = "Little Havana.csv")
River <- read.csv(file = "Little River.csv")
Midtown <- read.csv(file = "Midtown.csv")
MiMo <- read.csv(file = "MiMo.csv")
Morningside <- read.csv(file = "Morningside.csv")
Omni <- read.csv(file = "Omni.csv")
Overtown <- read.csv(file = "Overtown.csv")
ParkWest <- read.csv(file = "Park West.csv")
Shenandoah <- read.csv(file = "Shenandoah.csv")
SilverBluffs <- read.csv(file = "Silver Bluffs.csv")
TheRaods <- read.csv(file = "TheRoads.csv")
WestFlag <- read.csv(file = "West Flagler.csv")
Wynwood <- read.csv(file = "Wynwood.csv")

MasterData <- rbind(Allapattah, Brickell, BuenaVista, CoconutGrove, Downtown, 
                Edgewater, Flagami, Grapeland, LibertyCity, Haiti, Havana, 
                River, Midtown, MiMo, Morningside, Omni, Overtown, ParkWest, 
                Shenandoah, SilverBluffs, TheRaods, WestFlag, Wynwood)

# Create a column that distinguishes between suburban and urban
MasterData['Type'] <- 'Suburban'
# Repeat for urban neighborhoods
urbanNeighborhoods <- c("Brickell", "Downtown", "Edgewater", "Midtown",
                        "Omni", "Overtown", "ParkWest", "Wynwood")
MasterData$Type[MasterData$neighborhood %in% urbanNeighborhoods] <- 'Urban'

# Add Municipality (Only Miami Data Available)
MasterData['Municipality'] <- 'Miami'

# Rename Column dBa to Decibel Level and neighborhood to Neighborhood
names(MasterData)[2] <- 'Decibel Level'
names(MasterData)[3] <- 'Neighborhood'

# Renaming neighborhoods for clarity
MasterData$Neighborhood[MasterData$Neighborhood == 'TheRoads'] <- 'The Roads'
MasterData$Neighborhood[MasterData$Neighborhood == 'Grapeland Heights'] <- 'Grapeland'

# Save data
write.csv(MasterData, file = "MasterSoundData.csv")
