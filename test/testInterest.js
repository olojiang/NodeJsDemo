/**
 * Created by Hunter on 6/17/2015.
 */
"use strict";

var givePerMonth = 2.5;
var total = 60;
var interest = 6/100/12; // Interest

function pay(total, givePerMonth, interest){
    var month = 1;
    var totalInterest = 0;
    var originalTotal = total;
    while(total>0) {
        // Give
        var giveBase = total-givePerMonth>0?givePerMonth:total;

        // Add interest
        var interestResult = month*giveBase*interest;

        // Total give
        var give = giveBase + interestResult;

        console.info("月=%s, 还款(W)=%s, 还款基准(W)=%s, 利息（W）=%s",
            month, give.toFixed(4), giveBase.toFixed(4), interestResult.toFixed(4));

        // Minus total
        total = total-giveBase;

        // Total interest
        totalInterest = totalInterest + interestResult;

        // Increase month
        month++;
    }
    console.info("总目标款(W)=%s, 总利息(W)=%s", originalTotal, totalInterest.toFixed(4));
}

pay(total, givePerMonth, interest);