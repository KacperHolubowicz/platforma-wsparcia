using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PlatformaWsparciaAPI.Data.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace PlatformaWsparciaAPI.Service
{
    public class PriorityService : IPriorityService
    {
        private readonly string url;
        private readonly string authToken;

        public PriorityService(string url, string authToken)
        {
            this.url = url;
            this.authToken = authToken;
        }

        public async Task<int> GetPriorityAsync(LifeSituationFullDTO lifeSituation)
        {
            // Code from ML Studio C# Consume example
            var handler = new HttpClientHandler()
            {
                ClientCertificateOptions = ClientCertificateOption.Manual,
                ServerCertificateCustomValidationCallback =
                        (httpRequestMessage, cert, cetChain, policyErrors) => { return true; }
            };

            using (var client = new HttpClient(handler))
            {
                var scoreRequest = new
                {
                    Inputs = new Dictionary<string, List<Dictionary<string, string>>>()
                    {
                        {
                            "WebServiceInput0",
                            new List<Dictionary<string, string>>()
                            {
                                new Dictionary<string, string>()
                                {
                                    {
                                        "age", lifeSituation.Age.ToString()
                                    },
                                    {
                                        "population", lifeSituation.TownPopulation.ToString()
                                    },
                                    {
                                        "household_size", lifeSituation.HouseholdSize.ToString()
                                    },
                                    {
                                        "financial_situation", lifeSituation.FinancialSituation.ToString()
                                    },
                                    {
                                        "health_situation", lifeSituation.HealthSituation.ToString()
                                    },
                                    {
                                        "standard_of_living", lifeSituation.StandardOfLiving.ToString()
                                    },
                                    {
                                        "family_situation", lifeSituation.FamilySituation.ToString()
                                    },
                                    {
                                        "chronic_illnesses", (lifeSituation.ChronicIllnesses ? 1 : 0).ToString()
                                    },
                                    {
                                        "dependence", (lifeSituation.Dependece ? 1 : 0).ToString()
                                    },
                                    {
                                        "description", lifeSituation.Description
                                    },
                                    {
                                        "priority", "0"
                                    },
                                }
                            }
                        },
                    },
                    GlobalParameters = new Dictionary<string, string>()
                    {
                    }
                };

                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authToken);
                client.BaseAddress = new Uri(url);

                var requestString = JsonConvert.SerializeObject(scoreRequest);
                var content = new StringContent(requestString);

                content.Headers.ContentType = new MediaTypeHeaderValue("application/json");

                HttpResponseMessage response = await client.PostAsync("", content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    JObject obj = JObject.Parse(result);
                    int priority =
                        (int)obj["Results"]["WebServiceOutput0"][0]["RoundDigits(Scored Labels_$0.0)"];
                    return priority;
                }
                else
                {
                    throw new Exception();
                }
            }
        }
    }
}
