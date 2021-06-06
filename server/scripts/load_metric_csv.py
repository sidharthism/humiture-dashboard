import csv
from humiture.models import MetricRec


def run():
    fhand = open("Sample_Data.csv")
    reader = csv.reader(fhand)
    next(reader)

    # MetricRec.objects.all().delete()

    for row in reader:
        m = MetricRec(
            Time=row[0], Temperature=row[1], Humidity=row[2], Day=row[3])
        m.save()
        print(row)
        print(" Saved")
    fhand.close()
