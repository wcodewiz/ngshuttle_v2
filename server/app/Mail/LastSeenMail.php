<?php

namespace App\Mail;

use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class LastSeenMail extends Mailable
{
    use Queueable, SerializesModels;

    private User $user;
    private string $appName;
    private string $host;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user=$user;
        $this->appName=ShopApp::appName();
        $this->host=env("FRONT_HOST");

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: strtoupper("Alert!! $this->appName New Super deals and
            Recently Arrived Products"),
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $name=explode("@",$this->user->email)[0];

        return new Content(
            view: 'mail.mail',
            with:["subject"=>strtoupper("Hey $name!!"),
            "body"=>new HtmlString("Hello $name, <br>
            <h4 style='text-align:center;width:100%;'>$this->appName account was logged in</h4>. <hr/>
            <p>Your account has been inactive for a while now</p><br><article>
            You have been missing super deals and new arrival products, for the past "
            .ShopApp::timepass($this->user->last_seen)."
            new products have been listed on $this->appName with recently arrived products.
            <a  style='display:block;margin-top:14px;
            background-color:green;color:#fff;padding:5px 45px;text-decoration:none;border-radius:5px;'
            href='$this->host'>Visit Today</a>
            </article>"),]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}