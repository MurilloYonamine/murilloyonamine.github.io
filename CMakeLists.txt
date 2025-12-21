cmake_minimum_required(VERSION 3.28.3)

find_package(Crow)

project(portfolio)

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} PUBLIC Crow::Crow)