# Platforma wsparcia
Projekt zaliczeniowy nr 2 na zajęcia z przedmiotu "Wprowadzenie do aplikacji i rozwiązań opartych o Sztuczną Inteligencję i Microsoft Azure".

## Opis projektu
Głównym założeniem projektu jest stworzenie platformy umożliwiającej osobom potrzebującym
pomocy uzyskaniem jej od osób chętnych do udzielenia jej.

## Zespół
- Szymon Kuś https://github.com/ogoras
- Kacper Hołubowicz https://github.com/KacperHolubowicz
- Jakub Grenda https://github.com/7Bubun
- Paweł Cegielski https://github.com/Skokus

## Wideoprezentacja projektu
https://www.youtube.com/watch?v=x5m-79j7-vg

## Opis funkcjonalności
Aplikacja umożliwia osobom potrzebującym wypełnienie formularza, w którym podają swoje dane personalne i kontaktowe, opisują swą sytuację życiową, odpowiadają na kilka pytań, dzięki którym możliwe będzie ustalenie priorytetu pomocy im oraz podają produkty, które byłyby im potrzebne.
Osoby chcące wesprzeć innych również mają do wypełnienia formularz, w którym podają swoje dane personalne i kontaktowe oraz wskazują produkty, które mogliby przekazać w ramach pomocy osobom w potrzebie.
Dyspozytor może wybierać spośród osób potrzebujących oraz darczyńców w celu dopasowania ich sobie nawzajem.

## Schemat działania
1. Osoba potrzebująca włącza formularz osoby potrzebującej
2. Osoba potrzebująca wypełnia oraz przesyła formularz
3. Darczyńca włącza formularz darczyńcy
4. Darczyńca wypełnia oraz przesyła formularz
5. Dyspozytor loguje się na stronę dyspozytora
6. Dyspozytor spośród listy osób potrzebujących oraz darczyńców tworzy matche

## Architektura
![263093239_301640245233885_5062566637273321029_n](https://user-images.githubusercontent.com/93927311/144762969-21b70652-b52b-46c6-bcbc-12481f0e1a2e.png)

## Stos technologiczny
- App service
- SQL Database
- API Management
- Azure Machine Learning
- .NET 5, w tym ASP.NET Core Razor Pages, ASP.NET Core Web API oraz Entity Framework Core
- Javascript

## Zakres prac
- zgromadzenie formularzy osób potrzebujących
- przygotowanie wartości priorytetów poszczególnym formularzom
- utworzenie usługi modelu klasyfikującego Azure ML
- wytrenowanie modelu klasyfikującego 
- napisanie API, służącego komunikacji z aplikacją webową
- wdrożenie API
- przygotowanie bazy danych SQL do przechowywania informacji o użytkownikach
- stworzenie aplikacji webowej do interakcji z użytkownikami
- wdrożenie aplikacji
